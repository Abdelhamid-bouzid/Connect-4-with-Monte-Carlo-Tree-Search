package me.dillonbrock.cecs550.connectfourbackend;

import me.dillonbrock.cecs550.connectfourbackend.ai.Connect4AI;
import me.dillonbrock.cecs550.connectfourbackend.ai.Connect4Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
class DatabaseController {

    @Autowired
    private IGameDAO dao;

    @PostMapping("/")
    public GameState defaultPost(@Valid @RequestBody GameState state) {
        // Run the AI's next move if necessary.
        boolean calculateFirstPlayer = false;
        boolean calculateSecondPlayer = false;
        if (state.getMoves().size() % 2 == 0 && !state.getFirstPlayer().isHuman()) {
            calculateFirstPlayer = true;
        }
        if (state.getMoves().size() % 2 == 1 && !state.getSecondPlayer().isHuman()) {
            calculateSecondPlayer = true;
        }
        if (state.isInProgress() && (calculateFirstPlayer || calculateSecondPlayer)) {
            Player aiPlayer = calculateFirstPlayer ? state.getFirstPlayer() : state.getSecondPlayer();

            Connect4Board board = new Connect4Board();
            Connect4AI ai = new Connect4AI(board, TimeUnit.SECONDS.toNanos(2));
            System.out.println(Arrays.toString(state.getMoves().toArray()));
            for (int move : state.getMoves()) {
                board.place(move);
                ai.update(move);
            }
            System.out.println(board.toString());

            int moveColumn = ai.getOptimalMove(board, aiPlayer.getDifficulty().getDifficultyName());
            System.out.println("Move column: " + moveColumn);

            List<Integer> newMoves = new ArrayList<>(state.getMoves());
            newMoves.add(moveColumn);
            board.place(moveColumn);
            ai.update(moveColumn);

            state = new GameState(state.getId(), state.getFirstPlayer(), state.getSecondPlayer(),
                    newMoves, new Timestamp(System.currentTimeMillis()),
                    board.currentGameState() == Connect4Board.ONGOING);
        }

        if (dao.updateGame(state)) {
            return state;
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update game");
        }
    }

    @GetMapping("/{id}")
    public GameState defaultGet(@PathVariable int id) {
        try {
            return dao.getGame(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Requested ID not found");
        }
    }

    @GetMapping("/new")
    public String newGet() {
        int id = dao.newGameId();
        return String.format("{\"id\": %d}", id);
    }

    @GetMapping("/replays/{count}")
    public List<GameState> replaysCountGet(@PathVariable int count) {
        try {
            return dao.getReplays(count);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Requested ID not found");
        }
    }
}
