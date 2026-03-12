import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const { name, email, message, url, service } = body

        const { error } = await resend.emails.send({
            from: process.env.CONTACT_FROM_EMAIL!,
            to: process.env.CONTACT_TO_EMAIL!,
            replyTo: email,
            subject: "Nowa wiadomość ze strony",
            html: `
        <h2>Nowa wiadomość z formularza</h2>
        <p><strong>Imię:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Usługa:</strong> ${service}</p>
        <p><strong>URL:</strong> ${url || "-"}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${message}</p>
      `,
        })

        if (error) {
            console.error(error)
            return Response.json({ error: "Email error" }, { status: 500 })
        }

        return Response.json({ success: true })
    } catch (error) {
        console.error(error)
        return Response.json({ error: "Server error" }, { status: 500 })
    }
}