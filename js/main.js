    //var students = ['Danny', 'Kelsey', 'Mehdi', 'Pei', 'David', 'Hongsyn', 'Kirk', 'Melissa', 'Robert', 'Thomas', 'Daniel', 'Don', 'Jamie', 'Matthew', 'Michael', 'Ross', 'Zack'];

    //var images = ['danny.png', 'kelsey.png', 'mehdi.png', 'pei.png', 'david.png', 'hongsyn.jpeg', 'kirk.jpeg', 'melissa.png', 'robert.jpeg', 'thomas.jpeg', 'daniel.png', 'don.png', 'jamie.jpeg', 'matthew.jpeg', 'michael.png', 'ross.png', 'zack.png'];

    var pickedOn = [];

    $(document).ready(function () {
        var index;
        var student;
        var count = 0;

        getStudents();

        $("#ask").click(function () {

            if (count === students.length) {
                alert("You have picked on everyone today.  Please refresh the page to start again.");
                return;
            }

            var pickedOnStudentAlreadyFlag = true;

            while (pickedOnStudentAlreadyFlag === true && count < students.length) {
                index = generateStudentIndex();
                student = students[index];
                console.log("student = " + student.name);
                pickedOnStudentAlreadyFlag = pickedOnStudentAlready(student.name);

            }

            console.log(pickedOn);

            //var image = images[index].image;
            $(".student-name").text(student.name);
            $(".student-name").removeClass('hide');
            $(".img-circle").attr("src", "./images/" + student.image);
            $(".student-image").removeClass('hide');
            $(".thank-you").removeClass('hide');
        });


        function generateStudentIndex() {
            return Math.floor(Math.random() * students.length);
        }

        function pickedOnStudentAlready(student) {
            if (pickedOn.includes(student.name)) {
                console.log("found student!");
                return true;
            } else {
                console.log("didn't find student");
                pickedOn.push(student.name);
                count++;
                return false;
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

    });
