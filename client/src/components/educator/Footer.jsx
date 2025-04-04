import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t">
      <div className="flex items-center gap-4">
        <img src={assets.logo} alt="logo" className="hidden md:block w-20" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60">
          {/*this is for the left side and display bg colour and some text*/}
        </div>
        <p className="md:text-sm text-xs text-gray-500 py-4 text-center">
          Copyright 2025. All rights reserved
        </p>
      </div>

      <div className="flex items-center gap-3 mt-4 md:mt-0">
        {/*in here we add some links using ahref links for fb, instagram, and twitter*/}
        <a href="https://www.facebook.com">
          <img src={assets.facebook_icon} alt="facebook_icon" className="w-6 h-6" />
        </a>
        <a href="https://www.instagram.com/">
          <img src={assets.instagram_icon} alt="instagram_icon" className="w-6 h-6" />
        </a>
        <a href="https://twitter.com/">
          <img src={assets.twitter_icon} alt="twitter_icon" className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
