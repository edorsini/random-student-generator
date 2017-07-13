var students = [];
var pickedOn = [];

var index;
var student;
var count = 0;

$(document).ready(function () {

    initialize();

    $("#ask").click(function () {

        if (count === students.length) {
            alert("You have picked on everyone today.  Please refresh the page to start again.");
            return;
        }

        var pickedOnStudentAlreadyFlag = false;

        while (pickedOnStudentAlreadyFlag === false && count < students.length) {
            index = generateStudentIndex();
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


    function generateStudentIndex() {
        var rand = Math.random();
        console.log("Math random number: " + rand);
        console.log("multiplied value: " + (rand * students.length));
        return Math.floor(Math.random() * students.length);
    }

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

    function getStudents() {
        $.getJSON("data/students.json", function (data) {

            // $.each(data, function (key, val) {
            //     items.push("<li id='" + key + "'>" + val + "</li>");
            // });

            // $("<ul/>", {
            //     "class": "my-new-list",
            //     html: items.join("")
            // }).appendTo("body");
            students = data.students;
        });
    }

    function initialize() {
        getStudents();
    }

});
