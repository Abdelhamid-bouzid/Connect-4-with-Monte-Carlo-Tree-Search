#ifndef BOARD_H
#define BOARD_H

#include "holelabel.h"
#include <stdlib.h>
#include <stdio.h>
#include <array>
#include <QGridLayout>
#include <QPushButton>
#include <QString>
#include <QWidget>
#include <QApplication>
#include <QDebug>
#include <assert.h>
#include <math.h>

#define BUTTONSTYLE "QPushButton {border: 5px outset white; font: bold 40px; background-color: grey;}"

class Board : QGridLayout
{
    Q_OBJECT
public:
    Board(QWidget *parent);

private:
    QWidget *parent;
    const int ROWS = 6;
    const int COLUMNS = 7;
    HoleLabel::STATE turn = HoleLabel::RED;
    std::array<std::array<HoleLabel*, 6>, 7> holes;
    std::array<QPushButton*, 7> insertionButtons;

    //bool checkWin();
    //bool checkFour(HoleLabel *a, HoleLabel *b, HoleLabel *c, HoleLabel *d);
    bool checkList(HoleLabel **start, int range, int step = 1);

private slots:
    void insertPiece();
};

#endif // BOARD_H
