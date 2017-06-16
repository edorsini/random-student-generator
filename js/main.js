    var students = ['Danny', 'Kelsey', 'Mehdi', 'Pei', 'David', 'Hongsyn', 'Kirk', 'Melissa', 'Robert', 'Thomas', 'Daniel', 'Don', 'Jamie', 'Matthew', 'Michael', 'Ross', 'Zack'];

    var images = ['danny.png', 'kelsey.png', 'mehdi.png', 'pei.png', 'david.png', 'hongsyn.jpeg', 'kirk.jpeg', 'melissa.png', 'robert.jpeg', 'thomas.jpeg', 'daniel.png', 'don.png', 'jamie.jpeg', 'matthew.jpeg', 'michael.png', 'ross.png', 'zack.png'];

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
