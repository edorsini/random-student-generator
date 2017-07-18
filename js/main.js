var students = [];
var absentStudents = [];
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
        var bootstrapSize = getBootstrapSize(numberPerTeam);

        // shuffle students
        students.shuffle();

        // create <div> for each team within the .team-container <div>
        for (var i = 1; i <= numberOfTeams; i++) {
            $(".teams-container").append("<div class='col-md-" + bootstrapSize + "'><div class=' team-container team-" + (i) + "'><h2>Team " + (i) + "</h2></div></div>");
            // add students to each team
            for (var j = 0; j < numberPerTeam; j++) {
                console.log("indexTemp: " + indexTemp);
                $(".team-" + i).append('<li class="list-group-item">' + students[indexTemp].name + '</li>');
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
            student = getRandomStudent();
            pickedOnStudentAlreadyFlag = pickedOnStudentAlready(student);
        }

        console.log("pickedOn array: " + pickedOn);

        $(".student-name").text(student.name);
        $(".student-name").removeClass('hide');

        if (student.image === 'none') {
            getImageFromAPI();
        } else {
            $(".img-circle").attr("src", "./images/" + student.image);
        }
        $(".student-image").removeClass('hide');
        $(".thank-you").removeClass('hide');
    });

    /**
     * Removes absent students from array of students
     */
    function removeAbsentStudents() {
        var retrievedData = localStorage.getItem("absentStudents");
        absentStudents = JSON.parse(retrievedData);

        var filteredStudents = [];


        for (var i = 0; i < absentStudents.length; i++) {
            const nameToRemove = absentStudents[i];
            filteredStudents = students.filter((item) => item.name !== nameToRemove);
        }

        students = filteredStudents;

    }

    /**
     * Event listener: When `SAVE` button is clicked of absent form
     */
    $(".save-absent").click(function() {
        var tempArray = [];

        $("input:checkbox:checked").each(function() {
            tempArray.push($(this).val());
        });

        console.log(tempArray);

        // save to local storage
        localStorage.setItem("absentStudents", JSON.stringify(tempArray));

        // remove absent students from array of students
        removeAbsentStudents();
    });

    /**
     * Get image from GIPHY API
     */
    function getImageFromAPI() {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=new&limit=1&api_key=dc6zaTOxFJmzC";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response);
            var imageURL = response.data[0].images.original.url;
            $(".img-circle").attr("src", imageURL);
        });
    }

    /**
     * Determine what the bootstrap size should be for each team <div>
     */
    function getBootstrapSize(numberPerTeam) {
        var bootstrapSize;
        switch (parseInt(numberPerTeam)) {
            case 2:
                bootstrapSize = 2;
                break;
            case 3:
                bootstrapSize = 3;
                break;
            case 4:
                bootstrapSize = 3;
                break;
            default:
                bootstrapSize = 12;
        }
        return bootstrapSize;
    }

    /**
     * Generate a random student object from array of student objects
     */
    function getRandomStudent() {
        var rand = Math.random();
        var index;
        console.log("Math random number: " + rand);
        console.log("multiplied value: " + (rand * students.length));
        console.log("floored value: " + Math.floor(rand * students.length));
        index = Math.floor(rand * students.length);
        console.log("index chosen: " + index);
        student = students[index];
        console.log("student = " + student.name);
        return student;
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
            populateAbsentModal();
        });
    }

    /**
     * Populates the modal for setting students as absent
     */
    function populateAbsentModal() {
        for (var i = 0; i < students.length; i++) {
            $(".modal-body").append("<div class='absent-student'><li class='list-group-item'><div class='checkbox'><label><input class='studentName' type='checkbox' value='" + students[i].name + "'>" + students[i].name + "</label></div></li></div>");
        }
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