UPDATE games
SET
    firstPlayer_nickname = ?,
    firstPlayer_color = ?,
    firstPlayer_avatar = ?,
    firstPlayer_difficulty = ?,
    secondPlayer_nickname = ?,
    secondPlayer_color = ?,
    secondPlayer_avatar = ?,
    secondPlayer_difficulty = ?,
    moves = ?,
    `timestamp` = ?,
    inProgress = ?
WHERE id = ?
