package me.dillonbrock.cecs550.connectfourbackend;

public enum Difficulty {
    HUMAN("human"),
    EASY("easy"),
    MEDIUM("medium"),
    HARD("hard"),
    ;

    private final String difficultyName;

    Difficulty(String difficultyName) {
        this.difficultyName = difficultyName;
    }

    String getDifficultyName() {
        return difficultyName;
    }
}
