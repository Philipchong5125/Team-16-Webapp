$(document).ready(function () {
    var data;
    var email;
    var date = new Date();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log("user has logged in ");
            email = user.email;
            $("#hello-user").html("Hello " + user.displayName);

            var mood = document.getElementById("mood");
            var time = document.getElementById("time");

                if (mood.exists && time.exists) {

                    db.collection("tracker").doc(email).set({
                        date: new Date(),
                        time: document.getElementsById('time'),
                        mood: document.getElementById('mood')
                    });
                    getData();
                }

                function getData() {
                    firebase.database("tracker").ref(user.email).once('value', function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            var childKey = childSnapshot.key;
                            var childData = childSnapshot.val();
                            document.getElementById('data').innerHTML = childData['time'] + ", " + childData['mood'] + childData('date');
                        })
                    })
                }

        } else {
            // No user is signed in.
            console.log("user is not logged in");
            window.href = "login.html";
        }


    });

})