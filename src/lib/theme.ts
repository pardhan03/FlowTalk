import { Dimensions, Platform } from "react-native";
import { DeepPartial, Theme } from "stream-chat-expo";

const { width } = Dimensions.get("window");
const vw = (percent: number) => (width * percent) / 100;

// these colors are matching tailwind.config.js
export const COLORS = {
  primary: "#6366F1", // Indigo-500
  primaryDark: "#4F46E5", // Indigo-600
  primaryLight: "#818CF8", // Indigo-400
  primaryTransparent: "rgba(99, 102, 241, 0.12)",

  background: "#F8FAFC", // Slate-50
  surface: "#FFFFFF",
  surfaceDark: "#F1F5F9", // Slate-100
  surfaceLight: "#F8FAFC", // Slate-50

  text: "#0F172A", // Slate-900
  textMuted: "#475569", // Slate-600
  textSubtle: "#94A3B8", // Slate-400

  border: "#E2E8F0", // Slate-200
  borderLight: "#F1F5F9", // Slate-100

  success: "#10B981", // Emerald-500
  warning: "#F59E0B", // Amber-500
  danger: "#EF4444", // Red-500

  active: "#6366F1",

  outgoingBubble: "#6366F1",
  incomingBubble: "#F1F5F9", // Slate-100
  chatBackground: "#F8FAFC",

  accent: "#FF6B6B",
  accentSecondary: "#10B981",
};

export const myMessageTheme: DeepPartial<Theme> = {
  messageItemView: {
    content: {
      containerInner: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        borderRadius: 16,
      },
      markdown: {
        text: {
          color: "#FFFFFF",
        },
      },
    },
  },
};

export const studyBuddyTheme: DeepPartial<Theme> = {
  semantics: {
    accentPrimary: COLORS.primary,
    backgroundCoreApp: COLORS.background,
    backgroundCoreSurfaceDefault: COLORS.surface,
    backgroundCoreSurfaceStrong: COLORS.surfaceDark,
    backgroundCoreSurfaceSubtle: COLORS.surfaceLight,
    borderCoreDefault: COLORS.border,
    textPrimary: COLORS.text,
    textSecondary: COLORS.textMuted,
  },
  audioAttachment: {
    container: {
      backgroundColor: COLORS.surfaceDark,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      width: 300,
      overflow: "hidden",
    },
    leftContainer: {
      marginRight: 8,
    },
    playPauseButton: {
      backgroundColor: COLORS.primary,
      borderRadius: 20,
    },
    progressControlContainer: {
      flex: 1,
    },
    progressDurationText: {
      color: COLORS.textMuted,
      fontSize: 12,
    },
    rightContainer: {
      marginLeft: 8,
    },
    speedChangeButton: {
      backgroundColor: COLORS.surface,
      borderRadius: 4,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    speedChangeButtonText: {
      color: COLORS.text,
      fontSize: 12,
    },
  },
  imageGallery: {
    backgroundColor: COLORS.background,
    slide: {
      backgroundColor: COLORS.background,
    },
    grid: {
      contentContainer: {
        backgroundColor: COLORS.background,
      },
      handle: {
        backgroundColor: COLORS.background,
      },
      handleText: {
        color: COLORS.textMuted,
      },
    },
    header: {
      container: {
        backgroundColor: COLORS.surface,
      },
      usernameText: {
        color: COLORS.text,
      },
      dateText: {
        color: COLORS.textMuted,
      },
    },
    footer: {
      container: {
        backgroundColor: COLORS.surface,
      },
      imageCountText: {
        color: COLORS.textMuted,
      },
    },
  },
  channelListView: {
    flatList: {
      backgroundColor: COLORS.background,
    },
    flatListContent: {
      paddingBottom: 24,
      paddingTop: 8,
    },
  },
  loadingIndicator: {
    container: {
      backgroundColor: COLORS.background,
    },
    loadingText: {
      color: COLORS.textMuted,
    },
  },
  channelListFooterLoadingIndicator: {
    container: {
      backgroundColor: COLORS.background,
    },
  },
  channelListLoadingIndicator: {
    container: {
      backgroundColor: COLORS.background,
    },
  },
  channelListSkeleton: {
    container: { backgroundColor: COLORS.surfaceLight },
  },
  channelPreview: {
    container: {
      backgroundColor: COLORS.surface,
      borderRadius: 16,
      marginHorizontal: 20,
      marginVertical: 6,
      padding: 16,
      borderWidth: 1,
      borderColor: COLORS.borderLight,
      shadowColor: "#1C1929",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
    contentContainer: {
      backgroundColor: "transparent",
      padding: 0,
    },
    title: {
      color: COLORS.text,
      fontSize: 16,
      fontWeight: "700",
    },
    unreadContainer: {
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    unreadText: {
      color: "#FFFFFF",
      fontSize: 11,
      fontWeight: "700",
    },
    date: {
      color: COLORS.textSubtle,
      fontSize: 12,
    },
    message: {
      subtitle: {
        color: COLORS.textMuted,
        fontSize: 13.5,
      },
    },
  },
  messageList: {
    scrollToBottomButton: {
      container: {
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
      },
    },
    container: {
      backgroundColor: COLORS.surfaceLight,
    },
    contentContainer: {
      backgroundColor: COLORS.surfaceLight,
    },

    inlineUnreadIndicator: {
      container: {
        backgroundColor: COLORS.primary,
      },
      text: {
        color: COLORS.text,
      },
    },
    listContainer: {
      backgroundColor: COLORS.surfaceLight,
    },
  },

  messageComposer: {
    container: {
      backgroundColor: COLORS.surface,
      borderTopColor: COLORS.borderLight,
      borderTopWidth: 1,
      paddingTop: 10,
      paddingBottom: Platform.OS === 'ios' ? 24 : 10,
      paddingHorizontal: 12,
    },
    inputBox: {
      color: COLORS.text,
      fontSize: 15,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    inputBoxContainer: {
      backgroundColor: COLORS.surfaceLight,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: COLORS.border,
      marginRight: 8,
    },
    focusedInputBoxContainer: {
      borderColor: COLORS.primaryLight,
      borderWidth: 1,
      backgroundColor: COLORS.surface,
    },
    attachButtonContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: COLORS.surfaceLight,
      marginRight: 8,
    },
    sendButtonContainer: {
      backgroundColor: COLORS.primary,
      borderRadius: 18,
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
    },
    suggestionsListContainer: {
      container: {
        backgroundColor: COLORS.surface,
      },
    },
    audioRecorder: {
      micIcon: {
        pathFill: COLORS.textMuted,
      },
      checkContainer: {
        backgroundColor: COLORS.primary,
      },
      deleteContainer: {
        backgroundColor: COLORS.danger,
      },
      deleteIcon: {
        pathFill: COLORS.text,
      },
      slideToCancelContainer: {
        backgroundColor: COLORS.surface,
      },
    },
    audioRecordingInProgress: {
      container: {
        backgroundColor: COLORS.surface,
      },
      durationText: {
        color: COLORS.text,
      },
    },
    audioRecordingLockIndicator: {
      container: {
        backgroundColor: COLORS.surface,
      },
      lockIcon: {
        pathFill: COLORS.primary,
      },
      arrowUpIcon: {
        pathFill: COLORS.textMuted,
      },
    },
    audioRecordingPreview: {
      container: {
        backgroundColor: COLORS.surface,
      },
      currentTime: {
        color: COLORS.text,
      },
      progressBar: {
        backgroundColor: COLORS.primary,
      },
    },
    audioRecordingWaveform: {
      container: {
        backgroundColor: COLORS.surface,
      },
      waveform: {
        backgroundColor: COLORS.primary,
      },
    },
  },
  messageItemView: {
    file: {
      container: {
        backgroundColor: COLORS.surfaceDark,
        borderColor: COLORS.border,
      },
      fileSize: { color: COLORS.textMuted },
      title: { color: COLORS.text, fontWeight: "normal" },
    },
    pinnedHeader: { container: { display: "none" } },
    content: {
      textContainer: {
        maxWidth: vw(80),
        paddingHorizontal: 12,
      },
      replyBorder: {
        borderColor: COLORS.primary,
      },
      containerInner: {
        backgroundColor: COLORS.incomingBubble,
        borderColor: COLORS.incomingBubble,
        borderRadius: 16,
      },
      markdown: {
        em: {
          color: COLORS.textMuted,
        },
        text: {
          color: COLORS.text,
        },
      },
      metaText: {
        color: COLORS.textSubtle,
      },
    },
    deleted: {
      containerInner: {
        backgroundColor: COLORS.surfaceDark,
        borderColor: COLORS.surfaceDark,
      },
      deletedText: {
        color: COLORS.textMuted,
      },
    },
    giphy: {
      container: {
        margin: 4,
        borderRadius: 8,
      },
    },
    card: {
      container: {
        width: vw(80),
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
      },
      cover: {
        marginHorizontal: 0,
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      footer: {
        backgroundColor: COLORS.surfaceDark,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 12,
        title: {
          marginHorizontal: 4,
          marginBottom: 4,
          color: COLORS.text,
        },
        description: {
          marginHorizontal: 4,
          color: COLORS.textMuted,
        },
      },
    },
    replies: {
      container: {
        backgroundColor: COLORS.surface,
        borderRadius: 8,
      },
      messageRepliesText: {
        padding: 4,
        color: COLORS.primary,
      },
    },
    status: {
      timeIcon: {
        pathFill: COLORS.textSubtle,
      },
      checkAllIcon: {
        pathFill: COLORS.primary,
      },
      checkIcon: {
        pathFill: COLORS.textSubtle,
      },
    },
  },
  thread: {
    newThread: {
      backgroundGradientStart: COLORS.surfaceLight,
      backgroundGradientStop: COLORS.surfaceLight,
      text: {
        color: COLORS.textMuted,
      },
    },
  },
  reply: {
    container: {
      backgroundColor: COLORS.surfaceDark,
      borderColor: COLORS.border,
    },
  },
  typingIndicator: {
    container: {
      backgroundColor: COLORS.surfaceLight,
    },
    text: {
      color: COLORS.textMuted,
    },
  },
  poll: {
    button: {
      text: {
        color: COLORS.primary,
      },
    },
    message: {
      container: {
        backgroundColor: COLORS.incomingBubble,
        borderRadius: 8,
      },
      header: {
        title: {
          color: COLORS.primary,
        },
        subtitle: {
          color: COLORS.textMuted,
        },
      },
      option: {
        text: {
          color: COLORS.text,
        },
        progressBar: {
          backgroundColor: COLORS.border,
        },
      },
    },
  },
};