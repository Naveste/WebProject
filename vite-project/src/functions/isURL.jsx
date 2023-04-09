import React, {Fragment} from "react";

export const URL_REGEX= /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

// function for converting URL to a clickable link
export const clickableURL = (content) => {
    const words = content.split(' ');
    return (
        <p>
            {words.map((word, index) => {
                // if the current word matches the URL regex, make it a clickable link
                    if (word.match(URL_REGEX)){
                        return (
                            <Fragment key={index}>
                                <a href={word.startsWith("https://") ? word : `https://${word}`} target="_blank">{word}</a> {' '}
                            </Fragment>
                        )
                    }
                    // if the current word is not a URL, return it as plain text
                    return (word + ' ')
                }
            )}
        </p>
    );
}