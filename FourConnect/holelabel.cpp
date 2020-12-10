#include "holelabel.h"

HoleLabel::HoleLabel(QWidget *parent) : QLabel(parent)
{
    //this->resize(100,100);
    this->setFixedSize(100,100);
    //this->setText("0");
    this->setAlignment(Qt::AlignCenter);
}

void HoleLabel::setState(STATE state) {
    this->state = state;
    //this->setText(QString::number(state));
    if(state == RED)
        this->setStyleSheet("QLabel {background-color: red;}");
    else if (state == YELLOW)
        this->setStyleSheet("QLabel {background-color: yellow;}");
    else
        this->setStyleSheet("QLabel {background-color: transparent;}");
}

HoleLabel::STATE HoleLabel::getState() {
    return state;
}

bool HoleLabel::operator==(HoleLabel const &hole) {
    return state == hole.state;
}

bool HoleLabel::operator==(STATE state) {
    return this->state == state;
}

bool HoleLabel::operator!=(HoleLabel const &hole) {
    return state != hole.state;
}

bool HoleLabel::operator!=(STATE state) {
    return this->state != state;
}

