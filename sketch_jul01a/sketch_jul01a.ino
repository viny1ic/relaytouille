// here lies the spaghetti that controls the relays
// Do you dare to touch it mere mortal?
#include <EEPROM.h>
int relay[8];
int index=0;
int first;
void setup() {
  // put your setup code here, to run once:
  for(int i=2;i<=9;i++)
    pinMode(i,OUTPUT);
  Serial.begin(9600);

    for(int i=0;i<8;i++){
      relay[i]=EEPROM.read(i);
      Serial.println(relay[0]);
    }  
  while(!Serial.available());
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available()) {
    index = Serial.readString().toInt();
    Serial.println(index);
        relay[index]=(relay[index]+1)%2;
    for(int i=0;i<8;i++)
      Serial.print(EEPROM.read(i));
  }
    for(int i=2;i<=9;i++){
      digitalWrite(i,relay[i-2]);
      EEPROM.update(i-2, relay[i-2]);
      
    }
}
