type greetProps = {
    name: string
    messageCount: number
    isLoggedIn: boolean
}


export const Greet = (props: greetProps) => {
    return (
        <div>
            <h1>
            {props.isLoggedIn ? (
                    `Hello, ${props.name}! There's been ${props.messageCount} unseen notifications`
                ) : (
                    "Welcome to my React app, guest!"
                )}
            </h1>
        </div>

    )
}