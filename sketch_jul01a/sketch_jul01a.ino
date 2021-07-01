// here lies the spaghetti that controls the relays
// Do you dare to touch it mere mortal?
int relay[8]={1,1,1,1,1,1,1,1};
int index=0;
void setup() {
  // put your setup code here, to run once:
  for(int i=2;i<=9;i++)
    pinMode(i,OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available()) {
    index = Serial.parseInt();
    Serial.println(index);
        relay[index]=(relay[index]+1)%2;
    for(int i=0;i<=7;i++)
      Serial.print(relay[i]);
  }
    for(int i=2;i<=9;i++)
      digitalWrite(i,relay[i-2]);
}
