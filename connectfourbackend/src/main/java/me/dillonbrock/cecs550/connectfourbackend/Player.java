package me.dillonbrock.cecs550.connectfourbackend;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class Player implements Serializable {

    @NotNull
    @NotEmpty
    private final String nickname;

    @NotNull
    private final PlayerColor color;

    private final String avatar;

    private final Difficulty difficulty;

    public Player(String nickname, PlayerColor color, String avatar, Difficulty difficulty) {
        this.nickname = nickname;
        this.color = color;
        this.avatar = avatar;
        this.difficulty = difficulty;
    }

    public String getNickname() {
        return nickname;
    }

    public PlayerColor getColor() {
        return color;
    }

    public String getAvatar() {
        return avatar;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    @JsonIgnore
    public boolean isHuman() {
        return Difficulty.HUMAN.equals(difficulty);
    }
}
