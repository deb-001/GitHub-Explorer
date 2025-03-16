# GitHub Explorer

## Overview

GitHub Explorer is a Progressive Web Application (PWA) designed to help users explore GitHub repositories and contributors. The application offers customizable filters and search functionalities, making it easier to navigate and discover repositories based on various criteria.

## Features

- **Repository Search**: Search for repositories using keywords across fields like name, description, owner, and topics.
- **Customizable Filters**: Filter repositories by language, topics, stars, forks, and creation or push dates.
- **Responsive Design**: Optimized for both mobile and desktop viewing experiences.
- **Offline Access**: Utilizes service workers to provide offline functionality.

## Tech Stack

- **Frontend**: React.js for building user interfaces.
- **State Management**: RxJS for managing data flow and application architecture.
- **Styling**: CSS for styling components.
- **Search**: Elasticsearch integration for efficient repository search and filtering.
- **PWA Features**: Web App Manifest and Service Workers for offline capabilities and native app-like experience.

## Getting Started

### Prerequisites

- Node.js (version 6 or above)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/deb-001/GitHub-Explorer.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd GitHub-Explorer
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

### Development

To start the development server with Hot Module Replacement:

```bash
npm start
```

The application will be accessible at `http://localhost:8763`.

### Production Build

To create a production-ready build:

```bash
npm run build
```

The optimized files will be located in the `build` directory.

### Testing

To run tests:

```bash
npm test
```

Test coverage reports will be generated in the `./coverage/` directory.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the ISC License.

## Acknowledgments

- **Developer**: Trung Dinh Quang
- **UX/UI Designer**: Huynh Anh Quan
- **Animation Designer**: Van Cong Bang

Special thanks to Silicon Straits Saigon for their support.

*Note: This project is inspired by various GitHub exploration tools and aims to provide a comprehensive solution for users to navigate and discover repositories effectively.*

