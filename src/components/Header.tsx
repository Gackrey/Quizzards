import { HeaderProps } from "./HeaderProps.types";
import './Header.css'
export function Header({ name, score }: HeaderProps) {
    return (
        <>
            <h1 className='header'>Quizzards of Oz</h1>
            <div className='body'>
                <h2> Welcome, {name}! </h2>
                <h2> Score: {score} </h2>
            </div>
        </>);
}
