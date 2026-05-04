# Instagram Sentiment Analysis - Mobile App (React Native)

A professional React Native application with TypeScript for analyzing Instagram post comments using sentiment analysis.

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript with strict typing
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **HTTP Client**: Axios
- **UI Components**: React Native Paper, React Native Vector Icons
- **Data Storage**: AsyncStorage (local cache)
- **Charts**: React Native Chart Kit (optional)

## Project Structure

```
frontend/
├── src/
│   ├── screens/                 # App screens
│   │   ├── HomeScreen.tsx       # Main analysis input screen
│   │   ├── AnalysisScreen.tsx   # Display analysis results
│   │   ├── HistoryScreen.tsx    # View past analyses
│   │   └── CommentsScreen.tsx   # Detailed comments view
│   ├── components/              # Reusable components
│   │   ├── SentimentBreakdown.tsx
│   │   ├── SatisfactionScore.tsx
│   │   ├── CommentList.tsx
│   │   ├── LoadingIndicator.tsx
│   │   └── ErrorMessage.tsx
│   ├── services/                # API services
│   │   └── api.ts               # Backend API client
│   ├── redux/                   # State management
│   │   ├── store.ts             # Redux store configuration
│   │   └── hooks.ts             # Custom Redux hooks
│   ├── types/                   # TypeScript types
│   │   └── index.ts             # Type definitions
│   ├── utils/                   # Utility functions
│   │   └── helpers.ts           # Helper functions, colors, validators
│   ├── navigation/              # Navigation setup
│   │   └── AppNavigator.tsx     # Navigation configuration
│   ├── App.tsx                  # Main app component
│   └── assets/                  # Images, fonts, etc.
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
├── babel.config.js              # Babel configuration
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
└── README.md                    # Documentation
```

## Installation & Setup

### Prerequisites

- Node.js 16+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- Python backend running on `http://localhost:5000`

### Setup Instructions

1. **Navigate to frontend directory**:
```bash
cd frontend
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
```

3. **Create `.env` file** (copy from `.env.example`):
```bash
cp .env.example .env
```

4. **Update API URL** if needed (edit `.env`):
```
EXPO_PUBLIC_API_URL=http://localhost:5000/api
```

### Running the App

**Start Expo development server**:
```bash
npm start
# or
expo start
```

**Run on iOS** (macOS only):
```bash
npm run ios
# or
expo start --ios
```

**Run on Android**:
```bash
npm run android
# or
expo start --android
```

**Run on Web**:
```bash
npm run web
# or
expo start --web
```

## Features

### 🏠 Home Screen
- Beautiful input interface for Instagram post URLs
- Real-time URL validation
- Backend connectivity status check
- Features showcase
- Loading states with spinner
- Error handling with retry options

### 📊 Analysis Screen
- Satisfaction score display with emoji feedback
- Sentiment breakdown visualization with progress bars
- Comment list preview (top 5)
- Share analysis results
- Quick navigation to view all comments
- Post URL and timestamp information

### 📱 History Screen
- View all past analyses
- Pull-to-refresh functionality
- Summary statistics for each analysis
- Quick sentiment overview with colors
- Tap to view full details
- Empty state with helpful message

### 💬 Comments Screen
- View all comments from an analysis
- Filter by sentiment (All, Positive, Neutral, Negative)
- Sentiment emoji indicators
- Confidence scores
- Scrollable comment list

## API Integration

### Connecting to Backend

The app communicates with the Python Flask backend using REST API:

**Base URL**: `http://localhost:5000/api`

**Endpoints**:
- `POST /analyze` - Analyze Instagram post
- `GET /history` - Get analysis history
- `GET /history/<analysis_id>` - Get specific analysis
- `GET /health` - Health check

**Example Request**:
```typescript
import APIClient from '@services/api';

const result = await APIClient.analyzePost('https://www.instagram.com/p/ABC123/');
```

## State Management (Redux)

The app uses Redux Toolkit for state management:

```typescript
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setCurrentAnalysis, setLoading } from '@redux/store';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const analysis = useAppSelector((state) => state.analysis.currentAnalysis);
  
  // Use dispatch and selector
};
```

## Type Safety

Full TypeScript support with strict typing:

```typescript
interface AnalysisResult {
  analysis_id: string;
  post_url: string;
  total_comments: number;
  satisfaction_score: number;
  sentiment_breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  comments: Comment[];
  analyzed_at: string;
}
```

## Styling

Consistent color scheme throughout the app:

```typescript
colors = {
  primary: '#1F2937',
  secondary: '#3B82F6',
  positive: '#10B981',
  neutral: '#F59E0B',
  negative: '#EF4444',
  background: '#F3F4F6',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111827',
  textSecondary: '#6B7280',
};
```

## Environment Variables

Create `.env` file:

```
EXPO_PUBLIC_API_URL=http://localhost:5000/api
EXPO_PUBLIC_API_TIMEOUT=30000
EXPO_PUBLIC_ENABLE_LOGGING=true
EXPO_PUBLIC_ENABLE_ANALYTICS=false
```

## Building for Production

### Build APK for Android:
```bash
npm run build:android
# or
eas build --platform android
```

### Build IPA for iOS:
```bash
npm run build:ios
# or
eas build --platform ios
```

### Submit to App Stores:
```bash
# Android Play Store
npm run submit:android

# Apple App Store
npm run submit:ios
```

## Testing

### Run tests:
```bash
npm test
npm run test:watch
```

### Type checking:
```bash
npm run type-check
```

### Linting:
```bash
npm run lint
```

## Performance Optimization

1. **Code Splitting**: Lazy load screens
2. **Memoization**: Use `React.memo` for components
3. **List Optimization**: Use `FlatList` for large comment lists
4. **Image Caching**: Built-in with Expo
5. **Bundle Optimization**: Tree-shaking and minification

## Error Handling

- Network error detection
- Graceful fallbacks
- User-friendly error messages
- Automatic retry mechanisms
- Connection status indicator

## Security

- HTTPS in production
- API request validation
- Input sanitization
- Secure credential storage (AsyncStorage)
- No sensitive data in logs

## Troubleshooting

### "Backend connection failed"
- Ensure Flask server is running: `python app.py`
- Check if API URL is correct in `.env`
- Verify firewall settings

### "Cannot find module '@types/react-native'"
```bash
npm install --save-dev @types/react-native
```

### "Expo CLI not found"
```bash
npm install -g expo-cli
```

## Contributing

1. Create a feature branch
2. Follow TypeScript strict mode
3. Test changes thoroughly
4. Submit a pull request

## License

MIT License

## Support

For issues and questions:
- Check existing GitHub issues
- Review the documentation
- Contact the development team
