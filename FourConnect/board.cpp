#include "board.h"

Board::Board(QWidget *parent) : QGridLayout(parent)
{
    for (int i = 0; i < COLUMNS; ++i) {
        insertionButtons[i] = new QPushButton(parent);
        connect(qApp, SIGNAL(aboutToQuit()), insertionButtons[i], SLOT(deleteLater()));
        connect(insertionButtons[i], SIGNAL(clicked()), this, SLOT(insertPiece()));
        insertionButtons[i]->setFixedSize(100,100);
        insertionButtons[i]->setText(QString::number(i));
        //insertionButtons[i]->setStyleSheet("QPushButton:hover {background-color: red;}");
        this->addWidget(insertionButtons[i], 0, i);
        this->setSpacing(5);

        for (int j = 0; j < ROWS; ++j) {
            holes[i][j] = new HoleLabel(parent);
            connect(qApp, SIGNAL(aboutToQuit()), holes[i][j], SLOT(deleteLater()));
            this->addWidget(holes[i][j], 1 + j, i);
            this->setSpacing(5);
        }
    }
    this->parent = parent;
    parent->setLayout(this);
    parent->setStyleSheet("QLabel {border: 5px solid black; border-radius: 50px; }\
                          QLabel:disabled {border-color: white;}\
                          QPushButton {border-radius: 50px; border: 5px outset grey;\
                          font: bold 40px; background-color: blue; color: transparent;}\
                          QPushButton:flat:hover {background-color: yellow;}\
                          QPushButton:hover {background-color: red;}\
                          QPushButton:disabled {background-color: grey;}");
    //parent->setStyleSheet(parent->styleSheet().append("QPushButton:hover {background-color: red;"));
}

void Board::insertPiece() {
    // grab column index from signal sender
    int index = ((QPushButton*)sender())->text().toInt();
    
    // abort move if column is full
    if (*holes[index][0] != HoleLabel::EMPTY) {
        insertionButtons[index]->setEnabled(false);
        return;
    }

    // search for first empty from bottom to top in selected column
    for (int i = ROWS-1; i >= 0; --i) {
        if (*holes[index][i] == HoleLabel::EMPTY) {
            holes[index][i]->setState(turn);
            
            // disable column if filling last empty space
            insertionButtons[index]->setEnabled(i);

            // vertical and horizontal
            bool gameOver = checkList(&holes[index][i], ROWS - i)\
                     || checkList(&holes[0][i], COLUMNS, ROWS);
            
            // Note: below formulas for diagonals is unappetizing. Just make it a switch statement
            // or something to make it more readable. I don't feel like explaining the magic numbers.

            // BL to TR diagonal
            int position = i + index; // magic numbers
            if (position > 2 && position < 9) { // magic numbers
                if (position > 5) // magic number
                    gameOver |= checkList(&holes[position % 5][ROWS - 1], 12 - position, ROWS - 1); // magic numbers
                else
                    gameOver |= checkList(&holes[0][i + index], position + 1, ROWS - 1); // magic numbers
            }

            // TL to BR diagonal
            position = ROWS - 1 - i + index; // magic numbers
            if (position > 2 && position < 9) { // magic numbers
                if (position > 5) // magic numbers
                    gameOver |= checkList(&holes[position % 5][0], 12 - position, ROWS + 1); // magic numbers
                else
                    gameOver |= checkList(&holes[0][i - index], position + 1, ROWS + 1); // magic numbers
            }

            // disable further play if win was found
            if (gameOver)
                for(int j = 0; j < COLUMNS; ++j)
                    insertionButtons[j]->setEnabled(false);

            break;
        }
    }
    
    // swap turn
    if (turn == HoleLabel::RED)
        turn = HoleLabel::YELLOW;
    else
        turn = HoleLabel::RED;
    
    // change hover color (flatness)
    for(int i = 0; i < COLUMNS; ++i)
        insertionButtons[i]->setFlat(turn == HoleLabel::YELLOW); 
}

bool Board::checkList(HoleLabel **start, int range, int step) {
    assert(step != 0);

    // without 4 holes it's impossible to connect 4
    if(range < 4)
        return false;

    // count consecutive states
    for (int i = 0; range > 0; start+=step, --range) {
        // only consider the color that was just played
        if (start[0]->getState() != turn)
            i = 0;
        else if (++i >= 4) { // 4 in a row
            // highlight (disable) winning pieces
            for(; i > 0; --i, start-=step)
                start[0]->setEnabled(false); // highlight
            return true;
        }
    }

    // no win found
    return false;
}
