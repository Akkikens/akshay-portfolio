import React from "react";
import GithubIcon from "../Icons/GithubIcon";
import LinkedinIcon from "../Icons/LinkedinIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import YoutubeIcon from "../Icons/YoutubeIcon";

// Reusable icon component that links to social profiles
const ClickableIcon = ({ href, Icon }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <Icon className="w-5 h-5 text-gray-400 hover:text-AAsecondary fill-current hover:cursor-pointer" />
    </a>
  );
};

// Update your social links here
const IconsData = [
  { href: "https://github.com/Akkikens", Icon: GithubIcon },
  { href: "https://www.linkedin.com/in/akshaykalapgar", Icon: LinkedinIcon },
  { href: "https://www.instagram.com/akshay_kalapgar/", Icon: InstagramIcon },
  { href: "https://www.youtube.com/@akshaychannel", Icon: YoutubeIcon },
];

export default function Footer({ githubUrl, hideSocialsInDesktop }) {
  return (
    <div className="bg-AAprimary flex flex-col justify-center items-center py-8 space-y-4">
      {/* Social Icons */}
      <div
        className={`flex flex-row space-x-8 ${
          hideSocialsInDesktop ? "lg:hidden" : ""
        }`}
      >
        {IconsData.map((iconData, index) => (
          <ClickableIcon
            key={index}
            href={iconData.href}
            Icon={iconData.Icon}
          />
        ))}
      </div>

      {/* GitHub Source Code Link */}
      <a href={githubUrl} target="_blank" rel="noreferrer">
        <div className="group flex flex-col font-mono justify-center items-center text-gray-400 text-sm space-y-2">
          <span className="group-hover:text-AAsecondary sm:text-sm text-xs">
            Built by Akshay Kalapgar
          </span>

          <span className="text-xs flex flex-row items-center space-x-2 group-hover:text-AAsecondary">
            <GithubIcon className="w-4 h-4 text-gray-400 fill-current group-hover:text-AAsecondary" />
            <span>Source code - GitHub</span>
          </span>
        </div>
      </a>
    </div>
  );
}
