const  UserAVTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-100">
    <div class="max-w-screen-lg mx-auto mt-8">
        <div class="bg-white shadow-md rounded-lg px-8 py-6 mt-8">
            <h3 class="text-gray-800 text-sm">Welcome %NAME%</h3>
            <p class="text-gray-700 mt-2">Thank you for creating an account with Parkar. </p>
            <p>Please click the link below to activate your account.</p>
            <a href="https://backend-2-v1ta.onrender.com/v1/api/User/token/%userVerificationToken%"
                class="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Activate
                Account</a>
        </div>
    </div>
</body>

</html>`;
export default UserAVTemplate;