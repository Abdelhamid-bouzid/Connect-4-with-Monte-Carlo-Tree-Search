package me.dillonbrock.cecs550.connectfourbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class SQLGameDAO implements IGameDAO {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public int newGameId() {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement(
                    "INSERT INTO games (timestamp, inProgress) VALUES (?, ?)",
                    Statement.RETURN_GENERATED_KEYS);
            statement.setTimestamp(1, new Timestamp(System.currentTimeMillis()));
            statement.setBoolean(2, true);
            return statement;
        }, keyHolder);

        return keyHolder.getKey().intValue();
    }

    @Override
    public GameState getGame(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM games WHERE id = ?",
                new Object[]{ id }, new GameMapper());
    }

    @Override
    public boolean updateGame(GameState state) {
        int numRows = jdbcTemplate.update(C4Utils.loadResource("sql/update_game.sql"),
                new Object[]{
                        state.getFirstPlayer().getNickname(),
                        state.getFirstPlayer().getColor().name(),
                        state.getFirstPlayer().getAvatar(),
                        state.getFirstPlayer().getDifficulty().name(),
                        state.getSecondPlayer().getNickname(),
                        state.getSecondPlayer().getColor().name(),
                        state.getSecondPlayer().getAvatar(),
                        state.getSecondPlayer().getDifficulty().name(),
                        state.getMoves().stream()
                                .map(String::valueOf)
                                .collect(Collectors.joining(",")),
                        new Timestamp(state.getTimestamp().getTime()),
                        state.isInProgress(),
                        state.getId()
                }
        );
        return numRows > 0;
    }

    @Override
    public boolean deleteGame(int id) {
        int numRows = jdbcTemplate.update("DELETE FROM games WHERE id = ?",
                new Object[]{ id });
        return numRows > 0;
    }

    @Override
    public List<GameState> getReplays(int count) {
        return jdbcTemplate.query("SELECT * FROM games WHERE inProgress = 0 " +
                        "ORDER BY `timestamp` DESC LIMIT ?",
                new Object[]{ count }, new GameMapper());
    }
}
