import { useState } from "react";

function IotaPlayer() {
  // State for managing the image modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (imagePath: string) => {
    setCurrentImage(imagePath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  return (
    <main className="flex flex-col lg:flex-row gap-8 p-8">
      <section className="lg:w-2/3">
        <h1 className="text-4xl font-bold mb-6 text-blue-400">Iota Player</h1>
        <p className="text-gray-300 mb-4">
          Iota Player is a feature-rich desktop music player for Windows and
          Linux. It's meticulously designed for users who desire seamless
          playlist management, powerful playback controls, and deep integration
          with popular services like Discord and YouTube.
        </p>

        <div className="mb-8">
          <a
            href="https://raw.githubusercontent.com/vorlie/IotaPlayer/master/linux_installer.sh"
            download="linux_installer.sh" // Suggests a filename for download
            className="inline-block bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg text-md transition-colors duration-200"
          >
            Download Linux Installer
          </a>
          <p className="text-gray-400 text-sm mt-2">
            This will download (Press Ctrl + S) the one-command installer
            script. For detailed instructions on how to use it, please refer to
            the{" "}
            <a href="#installation" className="text-blue-400 hover:underline">
              Installation section below
            </a>
            .
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-blue-300">
          Core Features
        </h2>
        <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
          <li>
            <strong>Playlist Management:</strong> Utilize the dedicated{" "}
            <a
              href="https://github.com/vorlie/IotaPlayer/blob/master/README.md#playlist-maker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Playlist Maker
            </a>{" "}
            to build or modify playlists. You can create, edit, load, reload,
            combine songs from multiple sources into a single, unified playlist,
            and easily remove playlists you no longer need.
          </li>
          <li>
            <strong>Comprehensive Playback & Audio Controls:</strong> Enjoy
            standard playback functions including play, pause, resume, stop,
            next, and previous track. You can toggle repeat and shuffle modes
            for your playlists, instantly jump to any point in a song with a
            draggable progress bar (seek bar), and adjust volume with a simple
            slider. Iota Player uses PyQt6's native{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              QMediaPlayer
            </code>{" "}
            for stable and integrated playback.
          </li>
          <li>
            <strong>Media Key Support:</strong> Control your music effortlessly
            using your keyboard's media keys (Play/Pause, Next Track, Previous
            Track).
          </li>
          <li>
            <strong>Dynamic Display & Interface:</strong> View the artist,
            title, album, and genre of the current track. The window title
            dynamically updates to show the currently playing song. Personalize
            the UI by setting a custom accent color or using your system's
            default. Experience a clean, uniform look with automatic cover art
            extraction, caching, and cropping to a 1:1 aspect ratio, skipping
            already-cached covers for efficiency. Settings are organized into
            clear tabs (General, Appearance, Discord, Google, Cover Art) for
            easy navigation and configuration.
          </li>
          <li>
            <strong>Rich Integrations:</strong>
            <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
              <li>
                <strong>Discord Rich Presence:</strong> Broadcast your current
                song as your Discord status. Status updates instantly when you
                seek, pause, or change tracks. You can also display custom
                playlist images. Features robust reconnection if Discord
                restarts or disconnects.
              </li>
              <li>
                <strong>YouTube:</strong> Upload your local playlists directly
                to your YouTube account. You can also open the YouTube video for
                the currently playing song in your browser.
              </li>
              <li>
                <strong>MPRIS (Linux):</strong> Exposes metadata (artist, title,
                album, cover art, etc.) to Linux desktop environments and
                widgets. It operates in a read-only mode for maximum
                compatibility and stability.
              </li>
              <li>
                <strong>Google Integration:</strong> Supports Google API
                credentials for YouTube upload.
              </li>
            </ul>
          </li>
        </ul>

        <h2
          id="installation"
          className="text-2xl font-semibold mb-4 text-blue-300"
        >
          Installation
        </h2>

        <h3 className="text-xl font-semibold mb-2 text-blue-200">
          For Linux (Recommended)
        </h3>
        <p className="text-gray-300 mb-2">
          The{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">
            linux_installer.sh
          </code>{" "}
          script is the most straightforward way to install or update IotaPlayer
          on Linux. It handles all necessary steps for you, including:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
          <li>
            Installing required system dependencies (for Arch or Debian/Ubuntu).
          </li>
          <li>
            Setting up a Python virtual environment and installing Python
            dependencies.
          </li>
          <li>Building the application with PyInstaller.</li>
          <li>Prompting for an installation directory and copying files.</li>
          <li>Generating a launcher script.</li>
          <li>Optionally creating a desktop shortcut.</li>
        </ul>

        <p className="text-gray-300 mb-2">
          It supports two modes:{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">
            install
          </code>{" "}
          for a fresh setup, and{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">update</code>{" "}
          to refresh an existing installation.
        </p>

        <h4 className="text-lg font-semibold mb-2 text-blue-200">How to Use:</h4>
        <p className="text-gray-300 mb-2">
          1. <strong>Download the installer script:</strong>
        </p>
        <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto mb-2">
          <code>
            curl -O
            https://raw.githubusercontent.com/vorlie/IotaPlayer/master/linux_installer.sh
          </code>
        </pre>

        <p className="text-gray-300 mb-2">
          2. <strong>Make the script executable:</strong>
        </p>
        <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto mb-2">
          <code>chmod +x linux_installer.sh</code>
        </pre>

        <p className="text-gray-300 mb-2">
          3. <strong>Run the script:</strong>
        </p>
        <p className="text-gray-300 mb-1 ml-4">
          -{" "}
          <strong>To install IotaPlayer (first time or fresh install):</strong>
        </p>
        <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto mb-2 ml-4">
          <code>./linux_installer.sh install</code>
        </pre>
        <p className="text-gray-300 mb-2 ml-4">
          <span className="text-gray-400 italic">
            (Running{" "}
            <code className="bg-gray-700 px-1 rounded">
              ./linux_installer.sh
            </code>{" "}
            without any arguments will also default to the install mode.)
          </span>
        </p>

        <p className="text-gray-300 mb-1 ml-4">
          - <strong>To update an existing installation:</strong>
        </p>
        <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto mb-4 ml-4">
          <code>./linux_installer.sh update</code>
        </pre>
        <p className="text-gray-300 mb-4">
          The script will prompt you for the installation directory and any
          necessary confirmations during the process.
        </p>

        <h3 className="text-xl font-semibold mb-2 text-blue-200">
          Manual Installation for Linux (and other platforms)
        </h3>
        <p className="text-gray-300 mb-2">
          If you prefer to install from source, follow these steps:
        </p>

        <h4 className="text-lg font-medium mb-1 text-blue-100">
          1. System Requirements:
        </h4>
        <ul className="list-disc list-inside text-gray-300 mb-2 ml-4">
          <li>
            <strong>Python 3.13 or newer.</strong> Verify your version with{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              python3 --version
            </code>
            .
          </li>
          <li>
            <strong>GStreamer:</strong> Required for audio playback.
          </li>
          <li>
            <strong>PyQt6:</strong> For the user interface.
          </li>
        </ul>

        <h4 className="text-lg font-medium mb-1 text-blue-100">
          2. Install System Dependencies:
        </h4>
        <p className="text-gray-300 mb-1">
          For <strong>Ubuntu/Debian</strong>:
        </p>
        <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto mb-2">
          <code>
            sudo apt update{"\n"}
            sudo apt install gstreamer1.0-plugins-base gstreamer1.0-plugins-good{" "}
            {"\n"}
            gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly
            gstreamer1.0-libav {"\n"}
            libxcb-xinerama0
          </code>
        </pre>
        <p className="text-gray-300 mb-1">
          For <strong>Arch Linux</strong>:
        </p>
        <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto mb-2">
          <code>
            sudo pacman -Syu gstreamer gst-plugins-base gst-plugins-good
            gst-plugins-bad gst-plugins-ugly gst-libav {"\n"}
            qt6-multimedia
          </code>
        </pre>
        <p className="text-gray-300 text-sm mb-4">
          <strong>Note for Arch/Manjaro:</strong> If you use a PyInstaller or
          AppImage build, you may need to set these environment variables before
          launching the app to ensure GStreamer plugins are found:
        </p>
        <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto mb-4">
          <code>
            export GST_PLUGIN_SCANNER=/usr/lib/gstreamer-1.0/gst-plugin-scanner
            {"\n"}
            export GST_PLUGIN_PATH=/usr/lib/gstreamer-1.0{"\n"}
            export GST_PLUGIN_SYSTEM_PATH=/usr/lib/gstreamer-1.0{"\n"}
            ./IotaPlayer
          </code>
        </pre>
        <p className="text-gray-300 text-sm mb-4">
          If launching from a desktop shortcut, use a wrapper script that sets
          these variables. You may need to install other packages depending on
          your distribution; refer to the troubleshooting section for help with
          potential Qt errors.
        </p>

        <h4 className="text-lg font-medium mb-1 text-blue-100">
          3. Clone the Repository:
        </h4>
        <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto mb-2">
          <code>
            git clone https://github.com/vorlie/IotaPlayer.git{"\n"}
            cd IotaPlayer
          </code>
        </pre>

        <h4 className="text-lg font-medium mb-1 text-blue-100">
          4. Set up a Virtual Environment (Recommended):
        </h4>
        <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto mb-2">
          <code>
            python3 -m venv venv{"\n"}
            source venv/bin/activate
          </code>
        </pre>

        <h4 className="text-lg font-medium mb-1 text-blue-100">
          5. Install Python Dependencies:
        </h4>
        <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto mb-2">
          <code>pip3 install -r requirements.txt --ignore-requires-python</code>
        </pre>

        <h4 className="text-lg font-medium mb-1 text-blue-100">
          6. Run the Application:
        </h4>
        <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto mb-4">
          <code>python main.py</code>
        </pre>

        <h3 className="text-xl font-semibold mb-2 text-blue-200">For Windows</h3>
        <p className="text-gray-300 mb-4">
          On Windows, the recommended method is to download the latest{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">.exe</code>{" "}
          or{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">.zip</code>{" "}
          file from the{" "}
          <a
            href="https://github.com/vorlie/IotaPlayer/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Releases Page
          </a>
          . Simply extract the archive and run the executable. You can also run
          it from the source code by following the Linux instructions above,
          ensuring you have Python 3.13+ and all required dependencies.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-blue-300">
          Usage Guide
        </h2>
        <ul className="list-disc list-inside text-gray-300 mb-6 space-y-1">
          <li>
            <strong>Launch the application</strong> using the executable or by
            running{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              python main.py
            </code>
            .
          </li>
          <li>
            <strong>Manage Playlists:</strong> Use the UI buttons to load,
            create, or delete playlists.
          </li>
          <li>
            <strong>Control Playback:</strong> Use the on-screen controls or
            your keyboard's media keys.
          </li>
          <li>
            <strong>Customize:</strong> Open the <strong>Settings</strong>{" "}
            dialog to configure Discord integration, accent colors, and other
            options.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 text-blue-200">
          Playlist Maker Details
        </h3>
        <p className="text-gray-300 mb-2">
          The{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">
            PlaylistMaker
          </code>{" "}
          is a built-in tool for creating and managing your{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">.json</code>{" "}
          playlists.
        </p>
        <h4 className="text-lg font-medium mb-1 text-blue-100">How to Use:</h4>
        <ul className="list-disc list-inside text-gray-300 mb-4 ml-4 space-y-1">
          <li>
            <strong>Open Existing Playlist:</strong> Click to load and edit an
            existing{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              .json
            </code>{" "}
            playlist file.
          </li>
          <li>
            <strong>Select Folder:</strong> Automatically add all compatible
            audio files from a folder. Songs must follow a specific naming
            scheme below for metadata to be recognized.
          </li>
          <li>
            <strong>Add Songs Manually:</strong> Fill in the fields and click
            "Add Song" to add a single track.
          </li>
          <li>
            <strong>Edit & Delete:</strong> Double-click a song in the list to
            edit it. Select a song and press the{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              Delete
            </code>{" "}
            key to remove it.
          </li>
          <li>
            <strong>Save Playlist:</strong> Enter a playlist name, add an
            optional cover image link, and click "Save Playlist".
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          <strong>Naming Scheme for Auto-Recognition:</strong> For the "Select
          Folder" feature to work best, your files should be named like this:{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">
            Artist - Title [YouTube ID].mp3
          </code>
          . Example:{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">
            Artist - Title [dQw4w9WgXcQ].mp3
          </code>
          .
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-blue-300">
          Configuration
        </h2>
        <p className="text-gray-300 mb-2">
          Iota Player settings are configured via the in-app{" "}
          <strong>Settings</strong> menu. These settings are stored in a config
          file in your user configuration directory.
        </p>
        <p className="text-gray-300 mb-2">
          <strong>Linux/macOS:</strong> The configuration file is located at{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">
            ~/.config/IotaPlayer/config.json
          </code>
          .
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Windows:</strong> The configuration file is located at{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">
            %APPDATA%\IotaPlayer\config.json
          </code>
          . The file is created automatically with default values if it doesn't
          exist.
        </p>
        <h3 className="text-xl font-semibold mb-2 text-blue-200">
          <code>config.json</code> Example:
        </h3>
        <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto mb-4">
          <code>
            {`{`}
            {"\n"}
            {`    "connect_to_discord": true,`}
            {"\n"}
            {`    "discord_client_id": "1150680286649143356",`}
            {"\n"}
            {`    "large_image_key": "default_image",`}
            {"\n"}
            {`    "use_playing_status": false,`}
            {"\n"}
            {`    "root_playlist_folder": "playlists",`}
            {"\n"}
            {`    "default_playlist": "default",`}
            {"\n"}
            {`    "colorization_color": "automatic",`}
            {"\n"}
            {`    "volume_percentage": 100,`}
            {"\n"}
            {`    "google_client_secret_file": "path/to/client_secret.json"`}
            {"\n"}
            {`}`}
          </code>
        </pre>
        <p className="text-gray-300 mb-4">
          To use the YouTube playlist upload feature, you need to set up Google
          API credentials. For full instructions, please see the{" "}
          <a
            href="https://github.com/vorlie/IotaPlayer/blob/master/GOOGLE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GOOGLE.md guide
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-blue-300">
          Troubleshooting
        </h2>
        <ul className="list-disc list-inside text-gray-300 mb-6 space-y-1">
          <li>
            <strong>Codec Errors:</strong> On Linux, ensure you have installed
            all the{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              gstreamer1.0-plugins-*
            </code>{" "}
            packages listed in the installation section. On Windows, some{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">.mp3</code>{" "}
            files may fail to play if they have long ID3 tags, which can cause
            errors like{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              DirectShowPlayerService::doRender: Unresolved error code 80040266
            </code>
            . Installing a codec pack like{" "}
            <a
              href="https://codecguide.com/download_kl.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              K-Lite
            </a>{" "}
            usually resolves this.
          </li>
          <li>
            <strong>Python Version:</strong> This app requires{" "}
            <strong>Python 3.13 or newer</strong>. Verify your version with{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              python3 --version
            </code>
            .
          </li>
          <li>
            <strong>Qt Platform Errors (Linux):</strong> If you see{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">xcb</code>{" "}
            or other platform plugin errors, you may need to install additional
            libraries:
            <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto my-2">
              <code>
                sudo apt install libxcb-xinerama0 libxcb1 libx11-xcb1
                libgl1-mesa-glx
              </code>
            </pre>
            If you are using Wayland, you can try forcing the platform to XCB
            before running the app:
            <pre className="bg-gray-700 p-3 rounded-md text-gray-100 text-sm overflow-x-auto my-2">
              <code>
                export QT_QPA_PLATFORM=xcb{"\n"}
                python main.py
              </code>
            </pre>
          </li>
          <li>
            <strong>Check Logs:</strong> For detailed error information, check
            the{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              combined_app.log
            </code>{" "}
            file in the application directory.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Shortcuts</h2>
        <ul className="list-disc list-inside text-gray-300 mb-6 space-y-1">
          <li>
            <strong>Delete Playlist:</strong> Select a playlist and press{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              Delete
            </code>
            .
          </li>
          <li>
            <strong>Delete Song (in Playlist Maker):</strong> Select a song and
            press{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              Delete
            </code>
            .
          </li>
          <li>
            <strong>Media Keys:</strong>
            <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
              <li>
                <strong>Play/Pause:</strong>{" "}
                <code className="bg-gray-700 rounded px-1 text-gray-100">
                  Media Play/Pause
                </code>{" "}
                (e.g., FN + F7)
              </li>
              <li>
                <strong>Next Track:</strong>{" "}
                <code className="bg-gray-700 rounded px-1 text-gray-100">
                  Media Next
                </code>{" "}
                (e.g., FN + F6)
              </li>
              <li>
                <strong>Previous Track:</strong>{" "}
                <code className="bg-gray-700 rounded px-1 text-gray-100">
                  Media Previous
                </code>{" "}
                (e.g., FN + F5)
              </li>
            </ul>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-blue-300">
          Advanced Topics
        </h2>
        <h3 className="text-xl font-semibold mb-2 text-blue-200">Logging</h3>
        <p className="text-gray-300 mb-4">
          Logging is configured in{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">
            musicPlayer.py
          </code>
          . By default, logs are output to both the console and a rotating file
          named{" "}
          <code className="bg-gray-700 rounded px-1 text-gray-100">
            combined_app.log
          </code>
          . You can uncomment different logging configurations in the source
          code if needed.
        </p>
        <h3 className="text-xl font-semibold mb-2 text-blue-200">
          Building from Source
        </h3>
        <p className="text-gray-300 mb-4">
          While the one-command installer is recommended for Linux, if you wish
          to build a standalone executable (e.g., on Windows for distribution):
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-6 space-y-1">
          <li>
            <strong>Install PyInstaller:</strong>{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              pip install pyinstaller==6.6.0
            </code>
          </li>
          <li>
            <strong>Build the Executable:</strong>{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              pyinstaller IotaPlayerWIN.spec
            </code>{" "}
            (You can set{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              console=True
            </code>{" "}
            in the{" "}
            <code className="bg-gray-700 rounded px-1 text-gray-100">
              .spec
            </code>{" "}
            file to create a build with a command-line console for debugging.)
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Learn More</h2>
        <p className="text-gray-300 mb-4">
          Explore the full feature set, detailed troubleshooting, and advanced
          options by visiting the project's{" "}
          <a
            href="https://github.com/vorlie/IotaPlayer/blob/master/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            README on GitHub
          </a>
          . Stay up-to-date with development progress and planned features by
          viewing the{" "}
          <a
            href="https://github.com/users/vorlie/projects/3/views/1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            To-Do List on GitHub Projects
          </a>
          .
        </p>
      </section>

      <aside className="lg:w-1/3 bg-gray-800/50 p-6 rounded-lg shadow-lg h-min">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">
          About Iota Player
        </h2>
        <p className="text-gray-300 mb-4">
          Iota Player is developed to provide a robust and enjoyable music
          listening experience on desktop, with a strong commitment to the Linux
          ecosystem.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Gallery</h2>
        <details className="mb-6">
          <summary className="text-gray-300 cursor-pointer hover:text-white">
            Show Gallery
          </summary>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Main Window Image */}
            <div className="bg-gray-700 rounded-md p-2">
              <p className="text-gray-200 text-center text-sm mb-2">
                Main Window
              </p>
              <img
                src="/images/projects/iota-player/MainWindow.png"
                alt="Iota Player Main Window Dark Interface"
                className="w-full h-auto rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() =>
                  openModal("/images/projects/iota-player/MainWindow.png")
                }
              />
            </div>

            {/* Playlist Maker Image */}
            <div className="bg-gray-700 rounded-md p-2">
              <p className="text-gray-200 text-center text-sm mb-2">
                Playlist Maker
              </p>
              <img
                src="/images/projects/iota-player/PlaylistManager.png"
                alt="Iota Player Playlist Maker Dark Interface"
                className="w-full h-auto rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() =>
                  openModal("/images/projects/iota-player/PlaylistManager.png")
                }
              />
            </div>

            {/* Settings Image */}
            <div className="bg-gray-700 rounded-md p-2">
              <p className="text-gray-200 text-center text-sm mb-2">Settings</p>
              <img
                src="/images/projects/iota-player/Settings.png"
                alt="Iota Player Settings Dark Interface"
                className="w-full h-auto rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() =>
                  openModal("/images/projects/iota-player/Settings.png")
                }
              />
            </div>
          </div>
          <p className="text-gray-300 mt-4">
            For more details and context on these images, you can visit the{" "}
            <a
              href="https://github.com/vorlie/IotaPlayer/blob/master/README.md#gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              full gallery section in the README on GitHub
            </a>
            .
          </p>
        </details>

        <h3 className="text-xl font-semibold mb-2 text-blue-200">
          Key Technologies & Acknowledgments
        </h3>
        <p className="text-gray-300 mb-2">
          This project is built with the help of various robust Python
          libraries:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li>
            <strong>PyQt6:</strong> For the graphical user interface.
          </li>
          <li>
            <strong>qdarktheme:</strong> For easy dark/light theme integration.
          </li>
          <li>
            <strong>pypresence:</strong> For Discord Rich Presence integration.
          </li>
          <li>
            <strong>mutagen:</strong> For reading and handling audio metadata.
          </li>
          <li>
            <strong>pynput:</strong> For listening to global media key presses.
          </li>
          <li>
            <strong>pyinstaller:</strong> For packaging the application into an
            executable.
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          Special thanks go to{" "}
          <a
            href="https://github.com/albertosottile/darkdetect"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            DarkDetect
          </a>{" "}
          for providing the source code base for detecting Windows dark mode and
          accent colors.
        </p>
        <p className="text-gray-300">
          This project is licensed under the{" "}
          <a
            href="https://github.com/vorlie/IotaPlayer/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GNU General Public License v3.0
          </a>
          .
        </p>
      </aside>

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
              alt="Full size view of Iota Player interface"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default IotaPlayer;
