    var students = ['Andrew', 'Danny', 'Dylan', 'Kelsey', 'Mehdi', 'Pei', 'Stacy', 'David', 'Hongsyn', 'Kirk', 'Melissa', 'Robert', 'Thomas', 'Daniel', 'Don', 'Jamie', 'Matthew', 'Michael', 'Ross', 'Zack'];

    var images = ['andrew.png', 'danny.png', 'dylan.png', 'kelsey.png', 'mehdi.png', 'pei.png', 'stacy.png', 'david.png', 'hongsyn.jpeg', 'kirk.jpeg', 'melissa.png', 'robert.png', 'thomas.jpeg', 'daniel.png', 'don.png', 'jamie.jpeg', 'matthew.png', 'michael.png', 'ross.png', 'zack.png'];

    $(document).ready(function() {
        $("#ask").click(function() {
            var index = Math.floor(Math.random() * students.length);
            var student = students[index];
            var image = images[index];
            $(".student-name").text(student);
            $(".student-name").removeClass('hide');
            $(".img-circle").attr("src", "./images/" + image);
            $(".student-image").removeClass('hide');
            $(".thank-you").removeClass('hide');
        });
    });
