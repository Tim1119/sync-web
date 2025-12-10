"use client";

import { useEffect } from "react";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>
        <div className="text-sm text-gray-500 mb-12">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Sync (referred to as "we", "our", or "us"). We are
              committed to protecting your privacy and ensuring the security of
              your personal information. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our mobile application, website, and related services
              (collectively, the "Service").
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              By using our Service, you agree to the collection and use of
              information in accordance with this policy. If you do not agree
              with our policies and practices, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              1. Account Information
            </h3>
            <p className="text-gray-700 leading-relaxed">
              When you create an account with us, we collect:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Profile picture (if you choose to upload one)</li>
              <li>Job title and company name</li>
              <li>Bio and professional information</li>
              <li>Website and social media links</li>
              <li>Location (if provided)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              2. Contact Exchange Information
            </h3>
            <p className="text-gray-700 leading-relaxed">
              When you open someone's contact card link or share your contact
              information:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>First name and last name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name (optional)</li>
              <li>Additional notes (optional)</li>
              <li>IP address (automatically collected)</li>
              <li>Browser/device information (user agent)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Important:</strong> When you open a contact card link, we
              automatically collect and send your contact information to the
              owner of that link. This information is stored in your browser's
              local cache. If you visit the same link again, we use the cached
              information to automatically send your details to the link owner
              without requiring you to re-enter your information.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              3. Camera and Photo Access
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our mobile application requests access to your device's camera and
              photo library to allow you to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>Take photos for your profile picture</li>
              <li>Select existing photos from your gallery for your profile</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Camera access is only used when you explicitly choose to take a
              photo. We do not continuously access your camera in the
              background. Photo library access is only used when you select a
              photo to upload.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              4. Financial Information
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>
                We do not store, process, or have access to any credit card or
                payment card information.
              </strong>{" "}
              All payment transactions, if any, are processed through secure
              third-party payment processors. We do not collect, store, or
              retain any financial card data on our servers.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              5. Automatically Collected Information
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We may automatically collect certain information when you use our
              Service:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>
                Device information (type, operating system, unique identifiers)
              </li>
              <li>Usage data (pages visited, features used, time spent)</li>
              <li>Log data (IP address, browser type, access times)</li>
              <li>Location data (if you grant location permissions)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>To create and manage your account</li>
              <li>To generate and share your digital business card</li>
              <li>To facilitate contact exchanges between users</li>
              <li>
                To send contact information to link owners when you access their
                card links
              </li>
              <li>
                To store and retrieve cached contact information for returning
                visitors
              </li>
              <li>To provide, maintain, and improve our Service</li>
              <li>To send you important updates about the Service</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Contact Sharing Mechanism
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our Service includes a contact sharing feature that works as
              follows:
            </p>
            <ol className="list-decimal pl-6 mt-2 space-y-2 text-gray-700">
              <li>
                When you open someone's contact card link (shared via QR code,
                URL, or other means), we collect your contact information.
              </li>
              <li>
                On your first visit, you will be asked to provide your contact
                details (first name, last name, email, phone, and optionally
                company and notes).
              </li>
              <li>
                Your contact information is sent to the owner of the link you
                accessed.
              </li>
              <li>
                Your information is stored in your browser's local storage
                (cache) for future visits.
              </li>
              <li>
                When you visit the same link again, we automatically retrieve
                your cached information and send it to the link owner without
                requiring you to re-enter your details.
              </li>
              <li>
                The link owner receives your contact information and can view it
                in their contact exchange history.
              </li>
            </ol>
            <p className="text-gray-700 leading-relaxed mt-4">
              This automatic sharing only occurs when you access someone's
              contact card link. You can clear your browser's local storage at
              any time to remove cached contact information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Data Storage and Retention
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Server Storage
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Your account information and profile data are stored on our secure
              servers. Contact exchange information (both sent and received) is
              stored on our servers and is accessible to account holders in
              their contact exchange history.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Local Cache Storage
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Contact information you provide when accessing contact card links
              is stored in your device's local browser storage (localStorage).
              This cached data is used to automatically populate forms on
              subsequent visits to the same or other contact links. You can
              clear this cached data at any time through your browser settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Data Retention
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as your account is
              active or as needed to provide our Service. If you delete your
              account, we will delete or anonymize your personal information,
              except where we are required to retain it for legal compliance,
              dispute resolution, or enforcement of our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Information Sharing and Disclosure
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>
                <strong>Contact Exchange:</strong> When you access someone's
                contact card link, we share your contact information with that
                link owner as part of our contact exchange feature.
              </li>
              <li>
                <strong>Service Providers:</strong> We may share information
                with third-party service providers who perform services on our
                behalf (hosting, analytics, customer support).
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information
                if required by law or in response to valid requests by public
                authorities.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of assets, your information may be
                transferred to the acquiring entity.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may share information
                with your explicit consent for any other purpose.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. However, no method
              of transmission over the Internet or electronic storage is 100%
              secure. While we strive to protect your information, we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Your Rights and Choices
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>
                <strong>Access:</strong> You can access and review your personal
                information through your account settings.
              </li>
              <li>
                <strong>Update:</strong> You can update or correct your personal
                information at any time through your account settings.
              </li>
              <li>
                <strong>Delete:</strong> You can delete your account and request
                deletion of your personal information.
              </li>
              <li>
                <strong>Opt-out:</strong> You can opt-out of certain data
                collection by adjusting your device or browser settings.
              </li>
              <li>
                <strong>Clear Cache:</strong> You can clear your browser's local
                storage to remove cached contact information.
              </li>
              <li>
                <strong>Camera/Photo Access:</strong> You can grant or revoke
                camera and photo library permissions through your device
                settings.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our Service may contain links to third-party websites or services
              that are not operated by us. We have no control over and assume no
              responsibility for the privacy practices of these third-party
              sites. We encourage you to review the privacy policies of any
              third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our Service is not intended for individuals under the age of 13.
              We do not knowingly collect personal information from children
              under 13. If you believe we have collected information from a
              child under 13, please contact us immediately, and we will take
              steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <ul className="list-none mt-4 space-y-2 text-gray-700">
              <li>Email: privacy@buysync.co</li>
              <li>Website: buysync.co</li>
              <li>Address: Lagos, Nigeria</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
