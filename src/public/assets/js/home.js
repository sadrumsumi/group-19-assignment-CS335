$(document).ready(function () {
  document.getElementById("button").addEventListener("click", function (e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
    let body = { name, email, subject, message };
    axios
      .post("http://sadrumsumi:8888/contactUs", body)
      .then(({ data }) => {
        if (data["status"] == 200) {
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("subject").value = "";
          document.getElementById("message").value = "";
          $("#error").hide();
          $("#success").show();
          $("#success").text(data["message"]);
        } else {
          $("#error").show();
          $("#success").hide();
          $("#error").text(data["message"]);
        }
      })
      .catch((error) => {
        $("#error").show();
        $("#success").hide();
        $("#error").text(error);
      });
  });
});
