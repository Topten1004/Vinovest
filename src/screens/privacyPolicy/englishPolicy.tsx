import React from "react";
import { useCollectedInfoFor } from "./data";
import { TopTitle } from "#shared/ui/Typography/styled";
import { LiDescription, PDescriptionBold, DescriptionP, Section, UlStyle, BlackLink, INC } from "./style";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

export const EnglishPrivacyPolicy = () => (
    <Section>
        <MetaTagsReplacer title="Privacy Policy | Vinovest | Wine Investment" />

        <TopTitle as="h1">Privacy Policy</TopTitle>
        <DescriptionP>
            Vinovest respects and is committed to protecting your privacy. This Privacy Notice describes the types of
            information we may collect from you when you visit Vinovest.co (the “Site”), how we use the information we
            collect, with whom we share it, how we protect it, and the choices we offer you regarding our collection and
            use of such information.
        </DescriptionP>
        <DescriptionP>
            Please read this Privacy Notice carefully. By using the Site, you agree to the terms of this Privacy Notice.
            If you do not agree with the terms of this Privacy Notice, please do not use the Site.
        </DescriptionP>
        <br />
        <br />
        <br />
        <PDescriptionBold>Information We Collect and How We Use It</PDescriptionBold>
        <br />
        <br />
        <br />
        <DescriptionP>
            We may collect personal information from you, meaning information about you that can uniquely identify you,
            if you choose to provide us with such information. We may also collect information about you that does not
            uniquely identify you if you choose to provide us with such information. For example, if you register as a
            Vinovest member, we may collect your email address, telephone number, state of residence, zip code, net
            worth information, wine and taste preferences, and other information. Additionally, when you access the Site
            using a mobile device, we may collect and process real-time information about the location of your device if
            you consent to allow us to do so. WE DO NOT EVER SELL YOUR PERSONAL INFORMATION OR E-MAIL ADDRESS TO THIRD
            PARTIES.
        </DescriptionP>
        <br />
        <DescriptionP>We may use the information we collect to:</DescriptionP>
        <br />
        <br />
        <UlStyle>
            {useCollectedInfoFor.map((item) => (
                <LiDescription key={item.id}>{item.text}</LiDescription>
            ))}
        </UlStyle>
        <br />
        <br />
        <DescriptionP>
            We may enable you to sign into the Site via social networks or access social networks through the Site. If
            you do so, your use of the social network is governed by such social network’s terms and conditions and
            privacy policies. If you sign into the Site via a social network or access a social network through the
            Site, you may be asked to grant Vinovest access to certain information from your social network profile. We
            may use this information to help you personalize your experience with the Site, to suggest new features and
            content that may be relevant to you, or for statistical or other business purposes.
        </DescriptionP>
        <br />
        <DescriptionP>
            We also may use the information we obtain about you in other ways for which we provide specific notice at
            the time of collection.
        </DescriptionP>
        <br />
        <DescriptionP>
            We may enable third parties to collect information in connection with our Site. This Privacy Notice does not
            apply to, and we are not responsible for, any collection of information by third parties on our Site.
        </DescriptionP>
        <br />
        <br />
        <br />
        <PDescriptionBold>Cookies</PDescriptionBold>
        <br />
        <br />
        <br />
        <DescriptionP>
            When you visit the Site, we may also collect certain information by automated means, such as through the use
            of cookies. A “cookie” is a text file that websites send to a visitor’s computer or other Internet-connected
            device to uniquely identify the visitor’s browser or to store information or settings in the browser. We
            also may use third-party website analytics tools (such as Google Analytics), that collect information about
            user traffic on the Site. The information we collect by automated means may include, but is not limited to,
            the following:
        </DescriptionP>
        <UlStyle>
            <LiDescription>
                information about the devices you use to access the Internet (such as the IP address and the type of the
                device, operating system, and web browser);
            </LiDescription>
            <LiDescription>
                dates, times, and duration of visits to the Site (including whether you are a registered member or first
                time visitor); and
            </LiDescription>
            <LiDescription>
                information on actions taken on the Site (such as page views and site navigation patterns).
            </LiDescription>
        </UlStyle>
        <br />
        <br />
        <DescriptionP>
            We use cookies to store members’ preferences, record session information, record user-specific information
            on what pages members access or visit on the Site, alert members to new information that we think may be of
            interest to them when they return to our Site, and customize web page content based on a member’s browser
            type or other information we collect.
        </DescriptionP>
        <br />
        <br />
        <br />
        <PDescriptionBold>How We Respond to Do Not Track Signals</PDescriptionBold>
        <br />
        <br />
        <br />
        <DescriptionP>
            Your web browser may let you choose your preference as to whether you want to allow websites to collect
            personal information over time about your online activities across different websites or online services. At
            this time our Site does not respond to the preferences you may have set in your web browser regarding the
            collection of your information, and our Site may continue to collect information in the manner described in
            this Privacy Notice.
        </DescriptionP>
        <br />
        <br />
        <br />
        <PDescriptionBold>Information We Share</PDescriptionBold>
        <br />
        <br />
        <br />
        <DescriptionP>
            We may disclose aggregated information about our users without restriction. We may disclose your personal
            information to our contractors, service providers and other third parties we use to support our business. We
            contractually require these third parties to keep personal information confidential and use it only for the
            purposes for which we disclose it to them. We may also disclose your personal information to: (i) comply
            with court orders, laws, or legal process, including to respond to government or regulatory requests; (ii)
            enforce or apply our Terms & Conditions and other agreements; and/or (iii) if we believe disclosure is
            necessary or appropriate to protect our or others’ rights, property, or safety.
        </DescriptionP>
        <br />
        <br />
        <br />
        <DescriptionP>
            We may also disclose your personal information to a buyer or other transferee in the event of a merger,
            divestiture, restructuring, reorganization, dissolution, sale, or other transfer of some or all of our
            assets. Should such a sale, merger, or transfer occur, we will use reasonable efforts to direct the
            transferee to use your personal information in a manner that is consistent with our Privacy Notice.
        </DescriptionP>
        <br />
        <br />
        <br />
        <PDescriptionBold>Changes to our Privacy Notice</PDescriptionBold>
        <br />
        <br />
        <br />
        <DescriptionP>
            From time to time, Vinovest may update this Privacy Notice. If our information practices materially change
            at some time in the future, we will post the policy changes to our Site to notify you of these changes, and
            we will only use data collected from the time of the policy change forward for these new or different
            purposes. In the event we make a material change to how we use your personal information, we will provide
            you with an opportunity to opt out of such new or different use. The date this Privacy Notice was last
            revised is at the top of this page. You are responsible for periodically reviewing the Site and this Privacy
            Notice to check for any updates or changes.
        </DescriptionP>
        <br />
        <br />
        <br />
        <PDescriptionBold>OUR SECURITY PROCESS</PDescriptionBold>
        <br />
        <br />
        <br />
        <DescriptionP>
            While we cannot guaranty the security of our site and data, we attempt to use industry-best practices to
            protect the data and information that we collect. We currently use OKTA as a third-party security partner to
            monitor and secure our site.
        </DescriptionP>
        <br />
        <br />
        <br />
        <PDescriptionBold>YOUR CHOICES</PDescriptionBold>
        <br />
        <br />
        <br />
        <PDescriptionBold>Marketing Emails</PDescriptionBold>
        <DescriptionP>
            Individuals who have elected to receive Vinovest’s informational emails, including newsletters about wine
            deals, can choose to opt-out at any time by clicking on the "Unsubscribe" link at the bottom of each email.
            Vinovest members can also opt out from newsletters logging into the Site and visiting the Account section.
        </DescriptionP>
        <br />
        <br />
        <PDescriptionBold>Cookies</PDescriptionBold>
        <DescriptionP>
            Most browsers will tell you how to stop accepting new cookies, how to be notified when you receive a new
            cookie, and how to disable existing cookies. Please note, however, that without cookies you may not be able
            to take full advantage of all of the Site’s features.
        </DescriptionP>
        <br />
        <br />
        <PDescriptionBold>Location Information</PDescriptionBold>
        <DescriptionP>
            You can restrict our collection and use of real-time information about your device’s location through the
            device’s privacy settings.
        </DescriptionP>
        <br />
        <br />
        <PDescriptionBold>Web Analytics</PDescriptionBold>
        <DescriptionP>
            You may opt-out of the aggregation and analysis of data collected about you on our Site by our web analytics
            vendor by visiting
        </DescriptionP>
        <DescriptionP>
            <BlackLink href="https://tools.google.com/dlpage/gaoptout"> tools.google.com/dlpage/gaoptout</BlackLink> and
            downloading and installing the Google Analytics Opt-out Browser Add-on.
        </DescriptionP>
        <br />
        <br />
        <PDescriptionBold>Accessing Your Information</PDescriptionBold>
        <DescriptionP>
            <br />
            You can review and change your personal information by logging into the Site and visiting the Account
            section.
        </DescriptionP>
        <br />
        <br />
        <PDescriptionBold>Children Under the Age of 21</PDescriptionBold>
        <br />
        <DescriptionP>
            The Site is not directed to, and we do not knowingly collect or solicit personal information from, anyone
            under the age of 21. If we learn we have collected or received personal information from a anyone under the
            age of 21, we will delete that information. If you believe we might have any information from or about
            anyone under the age of 21, please contact us.
        </DescriptionP>
        <br />
        <br />
        <br />
        <PDescriptionBold>Contact Us</PDescriptionBold>
        <br />
        <DescriptionP>
            If you have any questions about this Privacy Notice or our privacy practices, please write, phone or email
            us via the contact information below:
        </DescriptionP>
        <br />
        <br />
        <br />
        <INC>Vinovest, Inc.</INC>
        <DescriptionP>9900 Culver Blvd</DescriptionP>
        <DescriptionP>Culver City, CA 90232</DescriptionP>
        <DescriptionP>949-415-8730</DescriptionP>
        <DescriptionP>
            <BlackLink href="mailto:help@vinovest.co">help@vinovest.co</BlackLink>
        </DescriptionP>
    </Section>
);
