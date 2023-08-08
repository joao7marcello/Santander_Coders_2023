document
    .getElementById("formReserva")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission (to avoid page reload)

        // Get the input field values
        const name = document.getElementById("formReserva").elements["nome"].value;
        const phone =
            document.getElementById("formReserva").elements["numeroTel"].value;
        const email =
            document.getElementById("formReserva").elements["email"].value;
        const persons =
            document.getElementById("formReserva").elements["personsSelect"].value;
        const date =
            document.getElementById("formReserva").elements["dataReserva"].value;
        const parts = date.split("-");

        // Extract day, month, and year from the parts array
        const year = parts[0];
        const month = parts[1];
        const day = parts[2];

        // Construct the new formatted date string in "dd/mm/yyyy" format
        const formattedDate = `${day}/${month}/${year}`;
        // Display the values in the console
        console.log("Name:", name);
        console.log("Phone:", phone);
        console.log("Email:", email);
        console.log("Pessoas:", persons);
        console.log("Date:", formattedDate);
        formReserva.reset();
        // You can also perform further processing or send the form data to a server here
    });