import React, {Fragment} from "react";

export const URL_REGEX= /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
export const clickableURL = (content) => {
    const links = content.split(' ');
    return (
        <p>
            {links.map((link, index) => {
                return link.match(URL_REGEX) ? (
                    <Fragment key={index}>
                        <a href={link.startsWith("https://") ? link : `https://${link}`} target="_blank">{link}</a>{' '}
                    </Fragment>
                ) : (
                    link + ' '
                );
            })}
        </p>
    );
}