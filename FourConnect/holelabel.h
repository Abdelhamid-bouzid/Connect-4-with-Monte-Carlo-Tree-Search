#ifndef HOLELABEL_H
#define HOLELABEL_H

#include <QObject>
#include <QLabel>
#include <QString>
#include <QWidget>
//#include <QSize>

class HoleLabel : public QLabel
{
    Q_OBJECT
public:
    enum STATE {EMPTY, RED, YELLOW};
    HoleLabel(QWidget *parent);
    void setState(STATE state);
    STATE getState();
    bool operator==(HoleLabel const &hole);
    bool operator==(STATE);
    bool operator!=(HoleLabel const &hole);
    bool operator!=(STATE);

private:
    STATE state = EMPTY;
};

#endif // HOLELABEL_H
