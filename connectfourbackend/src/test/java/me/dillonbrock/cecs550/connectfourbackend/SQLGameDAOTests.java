package me.dillonbrock.cecs550.connectfourbackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.util.ReflectionTestUtils;

import java.sql.Timestamp;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

@JdbcTest
@Sql({"/sql/test_create_table.sql"})
public class SQLGameDAOTests {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void testNewGameId() {
        IGameDAO dao = new SQLGameDAO();
        ReflectionTestUtils.setField(dao, "jdbcTemplate", jdbcTemplate);

        int id = dao.newGameId();
        assertEquals(id + 1, dao.newGameId());

        assertEquals(2, jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM games", Integer.class));
    }

    @Test
    void testUpdateAndGetGame() {
        IGameDAO dao = new SQLGameDAO();
        ReflectionTestUtils.setField(dao, "jdbcTemplate", jdbcTemplate);

        int id = dao.newGameId();
        GameState state = new GameState(
                id,
                new Player("Player 1", PlayerColor.RED, "a", Difficulty.HUMAN),
                new Player("CPU 1", PlayerColor.BLACK, "b", Difficulty.MEDIUM),
                Collections.emptyList(),
                new Timestamp(System.currentTimeMillis()),
                true
        );

        assertTrue(dao.updateGame(state));
        assertEquals(state.getTimestamp(), dao.getGame(id).getTimestamp());
    }

    @Test
    void testDeleteGame() {
        IGameDAO dao = new SQLGameDAO();
        ReflectionTestUtils.setField(dao, "jdbcTemplate", jdbcTemplate);

        int id = dao.newGameId();
        assertEquals(1, jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM games", Integer.class));

        assertTrue(dao.deleteGame(id));
        assertEquals(0, jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM games", Integer.class));
    }

    @Test
    void testGetReplays() {
        IGameDAO dao = new SQLGameDAO();
        ReflectionTestUtils.setField(dao, "jdbcTemplate", jdbcTemplate);

        // List should be empty before games are added.
        assertEquals(0, dao.getReplays(10).size());

        // Add the first completed game.
        int id = dao.newGameId();
        GameState state = new GameState(
                id,
                new Player("Player 1", PlayerColor.RED, "a", Difficulty.HUMAN),
                new Player("CPU 1", PlayerColor.BLACK, "b", Difficulty.MEDIUM),
                Collections.emptyList(),
                new Timestamp(System.currentTimeMillis()),
                false
        );
        dao.updateGame(state);
        assertEquals(1, dao.getReplays(10).size());

        // Add another completed game.
        id = dao.newGameId();
        state = new GameState(
                id,
                new Player("Player 2", PlayerColor.RED, "a", Difficulty.HUMAN),
                new Player("CPU 2", PlayerColor.BLACK, "b", Difficulty.MEDIUM),
                Collections.emptyList(),
                new Timestamp(System.currentTimeMillis()),
                false
        );
        dao.updateGame(state);

        // Add a game that is not yet completed and therefore should not be returned.
        id = dao.newGameId();
        state = new GameState(
                id,
                new Player("Player 3", PlayerColor.RED, "a", Difficulty.HUMAN),
                new Player("CPU 3", PlayerColor.BLACK, "b", Difficulty.MEDIUM),
                Collections.emptyList(),
                new Timestamp(System.currentTimeMillis()),
                true
        );
        dao.updateGame(state);

        assertEquals(2, dao.getReplays(10).size());
        assertEquals(1, dao.getReplays(1).size());
    }
}
