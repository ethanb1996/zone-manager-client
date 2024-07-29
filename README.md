# How to run the client?

1. Open cmd on the <project directory> and run: "npm run start"
2. Open Your browser on http://localhost:4200 

# zone-manager-client
    -The UI is based on boostrap 5.x
    -The zoneStore service is responsible of storing the state of the app.
    -The api service is responsible for the communication with the backend.
    -The config service is reponsible for loading the configuration from the assets using APP_INITIALIZER

    -When opening the browser you will see a window divide in two parts: 
        1.The right part is the canvas board where you can draw you zone and clear the canvas board. 
        2.The left part is the zone's dashboard where you can perform actions about the existing zone select one or delete.
          Besides, you have an input field to enter the name of the new zone you want to create with two buttons:
          a. Draw Zone to start the drawing on the canvas
          b. Save Zone when you finish your drawing. This button is enabled only when there is name and you finish drawing. 

