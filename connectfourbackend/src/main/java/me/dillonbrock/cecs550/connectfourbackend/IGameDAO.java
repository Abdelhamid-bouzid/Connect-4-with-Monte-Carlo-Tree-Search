package me.dillonbrock.cecs550.connectfourbackend;

import java.util.List;

public interface IGameDAO {
    int newGameId();
    GameState getGame(int id);
    boolean updateGame(GameState state);
    boolean deleteGame(int id);
    List<GameState> getReplays(int count);
}
