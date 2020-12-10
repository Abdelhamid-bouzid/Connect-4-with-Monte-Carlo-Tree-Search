package me.dillonbrock.cecs550.connectfourbackend;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class GameState implements Serializable {

    private final int id;

    @NotNull
    private final Player firstPlayer;

    @NotNull
    private final Player secondPlayer;

    @NotNull
    private final List<Integer> moves;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private final Date timestamp;

    private final boolean inProgress;

    public GameState(int id, Player firstPlayer, Player secondPlayer,
                     List<Integer> moves, Date timestamp, boolean inProgress) {
        this.id = id;
        this.firstPlayer = firstPlayer;
        this.secondPlayer = secondPlayer;
        this.moves = Collections.unmodifiableList(moves);
        this.timestamp = timestamp;
        this.inProgress = inProgress;
    }

    public int getId() {
        return id;
    }

    public Player getFirstPlayer() {
        return firstPlayer;
    }

    public Player getSecondPlayer() {
        return secondPlayer;
    }

    public List<Integer> getMoves() {
        return moves;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public boolean isInProgress() {
        return inProgress;
    }
}
