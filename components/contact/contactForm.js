import { useState, useEffect } from "react";
import Notification from "../ui/notification";

import classes from "../../styles/contactForm.module.css";

async function sendContactData(contactDetails) {
    const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(contactDetails),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }
}

export default function ContactForm() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (requestStatus === "success" || requestStatus === "error") {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function sendMessageHandler(event) {
        event.preventDefault();

        setRequestStatus("pending");

        try {
            await sendContactData({
                email,
                name,
                message,
            });

            setRequestStatus("success");
            setMessage("");
            setEmail("");
            setName("");
        } catch (error) {
            setError(error.message);
            setRequestStatus("error");
        }
    }

    let notification;

    if (requestStatus === "pending") {
        notification = {
            status: "pending",
            title: "Sending message...",
            message: "Your message is on its way",
        };
    } else if (requestStatus === "success") {
        notification = {
            status: "success",
            title: "Success!",
            message: "Message sent successfully!",
        };
    } else if (requestStatus === "error") {
        notification = {
            status: "error",
            title: "Error",
            message: error,
        };
    }

    return (
        <section className={classes.contact}>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.contorls}>
                    <div className={classes.contorl}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className={classes.contorl}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.contorl}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        rows={5}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    ></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
        </section>
    );
}
