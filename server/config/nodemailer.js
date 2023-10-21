export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    from: process.env.EMAIL,
    port: 587,
    secure: false,
    requireTLS: true
});
