#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    mainWidget = new QWidget();
    setCentralWidget(mainWidget);
    board = new Board(centralWidget());
    //mainWidget->show();
    this->setStyleSheet("QMainWindow{background-color: blue;}");

}

MainWindow::~MainWindow()
{
    delete board;
    delete mainWidget;
}

