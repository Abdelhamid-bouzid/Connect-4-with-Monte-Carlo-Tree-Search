package me.dillonbrock.cecs550.connectfourbackend;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class GameMapper implements RowMapper<GameState> {
    @Override
    public GameState mapRow(ResultSet rs, int rowNum) throws SQLException {
        Player firstPlayer = new Player(
                rs.getString("firstPlayer_nickname"),
                PlayerColor.valueOf(rs.getString("firstPlayer_color")),
                rs.getString("firstPlayer_avatar"),
                Difficulty.valueOf(rs.getString("firstPlayer_difficulty"))
        );
        Player secondPlayer = new Player(
                rs.getString("secondPlayer_nickname"),
                PlayerColor.valueOf(rs.getString("secondPlayer_color")),
                rs.getString("secondPlayer_avatar"),
                Difficulty.valueOf(rs.getString("secondPlayer_difficulty"))
        );

        return new GameState(
                rs.getInt("id"),
                firstPlayer,
                secondPlayer,
                parseMoves(rs.getString("moves")),
                rs.getTimestamp("timestamp"),
                rs.getBoolean("inProgress")
        );
    }

    private static List<Integer> parseMoves(String movesText) {
        if (movesText.length() == 0) {
            return Collections.emptyList();
        }

        return Stream.of(movesText.split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }
}
