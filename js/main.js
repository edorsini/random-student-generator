var students = [];
var pickedOn = [];

var index;
var student;
var count = 0;

$(document).ready(function() {

    initialize();

    /**
     * Event listener: When `CREATE TEAMS` button is clicked
     */
    $(".create-teams li a").click(function() {
        $(".teams-container").empty();

        var numberPerTeam = $(this).text();
        var numberOfTeams = parseInt(students.length / parseInt(numberPerTeam));
        console.log('number of teams: ' + numberOfTeams);
        var indexTemp = 0;
        var bootstrapSize = 0;

        switch (parseInt(numberPerTeam)) {
            case 2:
                bootstrapSize = 2; // good
                break;
            case 3:
                bootstrapSize = 3;
                break;
            case 4:
                bootstrapSize = 3; // good
                break;
            default:
                bootstrapSize = 12;
        }

        // shuffle students
        students.shuffle();

        // create <div> for each team within the .team-container <div>
        for (var i = 1; i <= numberOfTeams; i++) {
            $(".teams-container").append("<div class='col-md-" + bootstrapSize + "'><div class=' team-container team-" + (i) + "'><h2>Team " + (i) + "</h2></div></div>");
            // add students to each team
            for (var j = 0; j < numberPerTeam; j++) {
                console.log("indexTemp: " + indexTemp);
                var ulStart = '';
                var ulEnd = '';

                if (j === 0) {
                    //ulStart = '<ul class="list-group">';
                }

                if (j === 3) {
                    //ulEnd = '</ul>';
                }

                $(".team-" + i).append(ulStart + '<li class="list-group-item">' + students[indexTemp].name + '</li>' + ulEnd);
                indexTemp++;

            }
        }


        if (indexTemp < students.length) {
            console.log("indexTemp is: " + indexTemp);

            // add the last students to the last team
            for (indexTemp; indexTemp < students.length; indexTemp++) {
                console.log("gets here, left: " + (students.length - indexTemp) + ", add: " + students[indexTemp].name + ' --' + numberOfTeams);
                $(".team-" + numberOfTeams).append('<li class="list-group-item">' + students[indexTemp].name + '</li>');
            }
        }

    });

    /**
     * Event listener: When `ASK` button is clicked
     */
    $("#ask").click(function() {

        if (count === students.length) {
            alert("You have picked on everyone today.  Please refresh the page to start again.");
            return;
        }

        var pickedOnStudentAlreadyFlag = false;

        while (pickedOnStudentAlreadyFlag === false && count < students.length) {
            index = generateStudentIndex();
            console.log("index chosen: " + index);
            student = students[index];
            console.log("student = " + student.name);
            pickedOnStudentAlreadyFlag = pickedOnStudentAlready(student);

        }

        console.log("pickedOn array: " + pickedOn);

        $(".student-name").text(student.name);
        $(".student-name").removeClass('hide');
        $(".img-circle").attr("src", "./images/" + student.image);
        $(".student-image").removeClass('hide');
        $(".thank-you").removeClass('hide');
    });

    /**
     * Generate a random student object from array of student objects
     */
    function generateStudentIndex() {
        var rand = Math.random();
        console.log("Math random number: " + rand);
        console.log("multiplied value: " + (rand * students.length));
        console.log("floored value: " + Math.floor(rand * students.length));
        return Math.floor(rand * students.length);
    }

    /**
     * Determine if the student has been picked on already
     */
    function pickedOnStudentAlready(student) {
        if (pickedOn.includes(student.name)) {
            console.log("found student! " + student.name);
            return false;
        } else {
            console.log("didn't find student: " + student.name);
            pickedOn.push(student.name);
            count++;
            return true;
        }
    }

    /**
     * Get students from JSON file
     */
    function getStudents() {
        $.getJSON("data/students.json", function(data) {
            students = data.students;
        });
    }

    /**
     * Initialize wrapper function
     */
    function initialize() {
        getStudents();
    }

    Array.prototype.shuffle = function() {
        var input = this;

        for (var i = input.length - 1; i >= 0; i--) {

            var randomIndex = Math.floor(Math.random() * (i + 1));
            var itemAtIndex = input[randomIndex];

            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }

});