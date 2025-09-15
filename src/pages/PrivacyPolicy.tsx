function PrivacyPolicy() {
  return (
    <div className="min-h-screen text-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-6xl mx-auto py-4">
          <h1 className="text-3xl font-bold mb-4 text-white text-center md:text-left">
            Miko's Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 mb-4">
            <strong>Last Updated:</strong> 15/09/2025 (Day/Month/Year)
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">
              1. Information Collection
            </h2>
            <p className="text-lg text-gray-300 mb-2">
              Miko#3059 may collect the following types of information, which
              are necessary for its functionality:
            </p>
            <ul className="list-disc list-inside text-gray-300">
              <li>
                User IDs, Server IDs, and Channel IDs for basic bot
                functionality
              </li>
              <li>
                Member counts for server statistics and the bot's status display
              </li>
            </ul>
            <p className="mt-2 text-lg text-gray-300">
              We do not collect or store the content of messages, user presence
              data, or any other personally identifiable information beyond
              basic IDs required for command functionality.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">
              2. Use of Information
            </h2>
            <p className="text-lg text-gray-300 mb-2">
              The information collected is used to:
            </p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Provide and improve the Bot's functionality</li>
              <li>Respond to user inquiries and support requests</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">
              3. Data Handling and Security
            </h2>
            <p className="text-lg text-gray-300 mb-2">
              We take your privacy seriously. All data processing is designed to
              be as secure as possible:
            </p>
            <ul className="list-disc list-inside text-gray-300">
              <li>
                Image processing and other data manipulations are performed
                in-memory, without permanent storage.
              </li>
              <li>
                Temporary files created during processing are immediately
                deleted after being sent to the user.
              </li>
              <li>
                No permanent storage of user-submitted content or processed
                images occurs.
              </li>
              <li>
                Sensitive database operations use prepared statements to prevent
                SQL injection and other vulnerabilities.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">
              4. Information Sharing
            </h2>
            <p className="text-lg text-gray-300">
              We do not share your information with third parties, except as
              required by law or to protect our rights.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">
              5. User Rights
            </h2>
            <p className="text-lg text-gray-300 mb-2">
              You have the right to access, rectify, or delete your personal
              data that we may hold. Since we only store basic IDs, we provide a
              clear process for data requests:
            </p>
            <ul className="list-disc list-inside text-gray-300">
              <li>
                <strong>Data Access and Deletion:</strong> You can request
                access to or deletion of your data by contacting us through our
                support channels.
              </li>
              <li>
                <strong>Right to Object:</strong> You have the right to object
                to our processing of your personal data, under certain
                conditions.
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> If you have provided
                consent to the processing of your personal data, you have the
                right to withdraw your consent at any time.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">
              6. Changes to Privacy Policy
            </h2>
            <p className="text-lg text-gray-300">
              We reserve the right to modify this Privacy Policy at any time. We
              will notify users of any changes by updating the "Last Updated"
              date at the top of this document.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
