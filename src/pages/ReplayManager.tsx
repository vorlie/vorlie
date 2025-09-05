import { SetStateAction, useState } from "react";

function ReplayManager() {
  // State for managing the image modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [imageDescription, setImageDescription] = useState("");

  const openModal = (
    imageSrc: SetStateAction<string>,
    description: SetStateAction<string>
  ) => {
    setCurrentImage(imageSrc);
    setImageDescription(description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
    setImageDescription("");
  };

  return (
    <div className="min-h-screen text-gray-200">
      <main className="container mx-auto lg:p-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="lg:w-2/3">
            <h1 className="text-4xl font-bold mb-6 text-blue-400">
              WoT Replay Manager
            </h1>
            <p className="text-gray-300 mb-4 leading-relaxed">
              The WoT Replay Manager is a desktop application built with Python
              and PyQt6 that helps you manage and launch your World of Tanks
              replays. It provides a user-friendly interface to sort, view, and
              launch replay files, as well as clean up old replays that are no
              longer compatible with the current game version.
            </p>
            <p className="text-gray-300 font-bold italic mb-8">
              Mainly made for Linux users.
            </p>

            <ul className="list-disc list-inside space-y-4 mb-8">
              <li>
                <strong>Cross-Platform Compatibility:</strong> Supports both
                Windows and Linux operating systems.
              </li>
              <li>
                <strong>Replay Listing:</strong> Automatically detects and lists
                .wotreplay files from your specified directory.
              </li>
              <li>
                <strong>Detailed Information:</strong> Displays key replay
                metadata, including player name, tank, map, date, damage dealt,
                and game version.
              </li>
              <li>
                <strong>Sorting:</strong> Sort your replay list by date, player
                name, tank, map, or damage.
              </li>
              <li>
                <strong>Automatic Cleanup:</strong> Identifies and allows you to
                delete old replays that are incompatible with your current
                client version, saving you disk space.
              </li>
              <li>
                <strong>Launch Replays:</strong> Launches selected replays using
                your bottles-cli configuration.
              </li>
              <li>
                <strong>Persistent Settings:</strong> Saves your specified paths
                so you only need to configure them once.
              </li>
            </ul>

            <hr className="border-gray-700 mb-8" />

            {/* Prerequisites Section */}
            <h2 className="text-3xl font-semibold mb-4 text-blue-300">
              Prerequisites
            </h2>
            <p className="mb-4 text-gray-300">
              To run this application, you will need:
            </p>

            <h3 className="text-2xl font-medium mb-2 text-blue-200">
              0. Resources
            </h3>
            <ul className="list-disc list-inside ml-4 mb-4 text-gray-300 space-y-1">
              <li>
                <a
                  href="https://docs.astral.sh/uv/reference/cli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  uv CLI Reference
                </a>
              </li>
              <li>
                <a
                  href="https://docs.astral.sh/uv/getting-started/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  uv Getting Started
                </a>
              </li>
              <li>
                <a
                  href="https://docs.astral.sh/uv/guides/install-python/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  uv Install Python Guide
                </a>
              </li>
              <li>
                <a
                  href="https://docs.astral.sh/uv/getting-started/installation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  uv Installation
                </a>
              </li>
              <li>
                <a
                  href="https://docs.astral.sh/uv/guides/scripts/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  uv Scripts Guide
                </a>
              </li>
              <li>
                <a
                  href="https://usebottles.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Bottles Website
                </a>
              </li>
            </ul>

            <h3 className="text-2xl font-medium mb-2 text-blue-200">
              1. Python 3.x
            </h3>
            <p className="mb-2 text-gray-300">
              Make sure Python is installed on your system. If not, you can run{" "}
              <code className="bg-gray-700 rounded px-1 text-gray-100">uv python install</code>.
            </p>
            <p className="mb-4 text-gray-300">
              On Linux, you may need to use <code className="bg-gray-700 rounded px-1 text-gray-100">python3</code> and{" "}
              <code className="bg-gray-700 rounded px-1 text-gray-100">pip3</code> instead of <code className="bg-gray-700 rounded px-1 text-gray-100">python</code> and{" "}
              <code className="bg-gray-700 rounded px-1 text-gray-100">pip</code> in your commands.
            </p>

            <h3 className="text-2xl font-medium mb-2 text-blue-200">
              2. Create a Virtual Environment with uv
            </h3>
            <p className="mb-2 text-gray-300">
              It's a best practice to install project dependencies in a virtual
              environment to avoid conflicts with other Python projects. Using{" "}
              <code className="bg-gray-700 rounded px-1 text-gray-100">uv</code> is the fastest way to set this up. Open your
              terminal or command prompt and run the following command:
            </p>
            <pre className="bg-gray-800 p-4 rounded-md text-gray-100 overflow-x-auto my-2">
              <code className="bg-gray-700 rounded px-1 text-gray-100">uv venv</code>
            </pre>

            <h3 className="text-2xl font-medium mb-2 text-blue-200">
              3. Install Dependencies
            </h3>
            <p className="mb-4 text-gray-300">
              With your virtual environment created, you can install all
              necessary libraries by running a single command:{" "}
              <code className="bg-gray-700 rounded px-1 text-gray-100">uv pip install -r requirements.txt</code>
            </p>

            <h3 className="text-2xl font-medium mb-2 text-blue-200">
              4. Bottles CLI (Optional, for replay playback)
            </h3>
            <p className="mb-2 text-gray-300">
              This tool is typically used on Linux systems for managing Windows
              applications.
            </p>
            <p className="mb-2 text-gray-300">
              This step can be skipped if you are using Windows, as replays will
              launch with your local game installation.
            </p>
            <p className="mb-4 text-gray-300">
              It is required to launch replays with your World of Tanks
              executable if you are on Linux. The rest of the application's
              features will work without it.
            </p>
            <p className="mb-4 text-gray-300">
              You can find more information about Bottles and its CLI on the
              official website: https://usebottles.com/
            </p>

            <h3 className="text-2xl font-medium mb-2 text-blue-200">
              5. How to Run the Application
            </h3>
            <p className="mb-2 text-gray-300">
              With the virtual environment created and dependencies installed,
              you can run the application directly from your terminal.
            </p>
            <p className="mb-4 text-gray-300">
              Using <code className="bg-gray-700 rounded px-1 text-gray-100">uv run</code> will automatically use the correct
              virtual environment: <code className="bg-gray-700 rounded px-1 text-gray-100">uv run python main.py</code>
            </p>

            <hr className="border-gray-700 mb-8" />

            {/* How to Use Section */}
            <h2 className="text-3xl font-semibold mb-4 text-blue-300">
              How to Use
            </h2>
            <h3 className="text-2xl font-medium mb-2 text-blue-200">
              1. First-Time Setup
            </h3>
            <p className="mb-2 text-gray-300">
              Upon first launch, the application will prompt you to configure
              the necessary settings. You will need to provide the following
              paths:
            </p>
            <ul className="list-disc list-inside ml-4 mb-4 text-gray-300 space-y-1">
              <li>
                <strong>Bottles Bottle Name</strong> (Linux only): The name of
                the Bottles container where World of Tanks is installed (e.g.,{" "}
                <code className="bg-gray-700 rounded px-1 text-gray-100">WindowsGames</code>). This setting will be ignored on
                Windows.
              </li>
              <li>
                <strong>WoT Executable Path</strong>: The full path to your{" "}
                <code className="bg-gray-700 rounded px-1 text-gray-100">WorldOfTanks.exe</code> file.
              </li>
              <li>
                <strong>Replays Folder Path</strong>: The folder where your{" "}
                <code className="bg-gray-700 rounded px-1 text-gray-100">.wotreplay</code> files are saved.
              </li>
              <li>
                <strong>Client Version XML Path</strong>: The path to the{" "}
                <code className="bg-gray-700 rounded px-1 text-gray-100">version.xml</code> file in your World of Tanks game
                directory (used for replay cleanup).
              </li>
            </ul>
            <p className="mb-4 text-gray-300">
              The file dialogs will automatically open in the last known game
              directory to make it easier to find the correct files.
            </p>

            <h3 className="text-2xl font-medium mb-2 text-blue-200">
              2. Managing Replays
            </h3>
            <ul className="list-disc list-inside ml-4 mb-4 text-gray-300 space-y-1">
              <li>
                The main window will display a list of all detected replays.
              </li>
              <li>
                Use the "<strong>Sort by</strong>" dropdown menu to change the
                order of the replay list.
              </li>
              <li>
                Select a replay from the list and click the "
                <strong>Launch Replay</strong>" button to start the replay in
                World of Tanks.
              </li>
            </ul>

            <h3 className="text-2xl font-medium mb-2 text-blue-200">
              3. Cleaning Up Old Replays
            </h3>
            <ul className="list-disc list-inside ml-4 mb-4 text-gray-300 space-y-1">
              <li>
                Click the "<strong>Cleanup Old Replays</strong>" button to find
                and delete replays that are no longer compatible with your
                current game version.
              </li>
              <li>
                A confirmation dialog will appear, showing you how many replays
                are about to be deleted.
              </li>
              <li>
                This feature helps you free up disk space by removing outdated
                files.
              </li>
            </ul>

            <hr className="border-gray-700 mb-8" />

            {/* Code Structure Section */}
            <h2 className="text-3xl font-semibold mb-4 text-blue-300">
              Code Structure
            </h2>
            <ul className="list-disc list-inside ml-4 mb-4 text-gray-300 space-y-1">
              <li>
                <code className="bg-gray-700 rounded px-1 text-gray-100">main.py</code>: The main application file containing the
                `ReplayManager` and `SettingsDialog` classes. It handles the UI,
                user interactions, and core application logic.
              </li>
              <li>
                <code className="bg-gray-700 rounded px-1 text-gray-100">utils/__init__.py</code>: Contains helper functions, such
                as `get_replay_data`, which is responsible for parsing the
                replay files and extracting metadata.
              </li>
            </ul>
          </section>

          <aside className="lg:w-1/3 bg-gray-800/50 p-6 rounded-lg shadow-lg h-min">
            <h2 className="text-3xl font-semibold mb-4 text-blue-300">
              Gallery
            </h2>
            <details className="mb-6">
              <summary className="text-gray-300 cursor-pointer hover:text-white">
                Show Screenshots
              </summary>
              <div className="mt-4 flex flex-col items-center gap-4">
                <div className="bg-gray-700 rounded-md p-2 w-full">
                  <p className="text-gray-200 text-center text-sm mb-2">
                    Replay List
                  </p>
                  <img
                    src="/images/projects/replay-manager/MainWindow.png"
                    alt="WoT Replay Manager showing a list of replays"
                    className="w-full h-auto rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() =>
                      openModal(
                        "/images/projects/replay-manager/MainWindow.png",
                        "WoT Replay Manager showing a list of replays"
                      )
                    }
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-col items-center gap-4">
                <div className="bg-gray-700 rounded-md p-2 w-full">
                  <p className="text-gray-200 text-center text-sm mb-2">
                    Settings
                  </p>
                  <img
                    src="/images/projects/replay-manager/Settings.png"
                    alt="WoT Replay Manager showing the settings"
                    className="w-full h-auto rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() =>
                      openModal(
                        "/images/projects/replay-manager/Settings.png",
                        "WoT Replay Manager showing the settings"
                      )
                    }
                  />
                </div>
              </div>
            </details>
          </aside>
        </div>
      </main>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-3 -right-3 text-white text-3xl leading-none font-bold bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors z-50"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={currentImage}
              alt={imageDescription}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ReplayManager;
