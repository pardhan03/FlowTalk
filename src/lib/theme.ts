import { Dimensions } from "react-native";
import { DeepPartial, Theme } from "stream-chat-expo";

const { width } = Dimensions.get("window");
const vw = (percent: number) => (width * percent) / 100;

// these colors are matching tailwind.config.js
export const COLORS = {
  primary: "#6C5CE7",
  primaryDark: "#4B38D3",
  primaryLight: "#8F85F3",
  primaryTransparent: "rgba(108, 92, 231, 0.15)",

  background: "#F6F7FB",
  surface: "#FFFFFF",
  surfaceDark: "#EBEFF5",
  surfaceLight: "#F0F3F8",

  text: "#1C1929",
  textMuted: "#5C5A6A",
  textSubtle: "#8B899A",

  border: "#E2E7EE",
  borderLight: "#EFF2F6",

  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",

  active: "#6C5CE7",

  outgoingBubble: "#6C5CE7",
  incomingBubble: "#EBEFF5",
  chatBackground: "#F6F7FB",

  accent: "#FF6B6B",
  accentSecondary: "#10B981",
};

export const myMessageTheme: DeepPartial<Theme> = {
  messageItemView: {
    content: {
      containerInner: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
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
      borderRadius: 28,
      borderWidth: 1,
      borderColor: COLORS.borderLight,
      paddingTop: 6,
      paddingBottom: 6,
      paddingHorizontal: 8,
      marginHorizontal: 12,
      marginBottom: 12,
      marginTop: 6,
      shadowColor: "#1C1929",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 5,
    },
    inputBox: {
      color: COLORS.text,
      fontSize: 16,
      paddingHorizontal: 12,
      paddingVertical: 8,
      minHeight: 38,
    },
    inputBoxContainer: {
      backgroundColor: "transparent",
      borderRadius: 24,
      borderWidth: 0,
      marginRight: 4,
    },
    focusedInputBoxContainer: {
      borderColor: "transparent",
      borderWidth: 0,
      backgroundColor: "transparent",
    },
    attachButtonContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "transparent",
      marginRight: 4,
    },
    sendButtonContainer: {
      backgroundColor: "transparent",
      borderRadius: 18,
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
    },
    suggestionsListContainer: {
      container: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        shadowColor: "#1C1929",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
      },
    },
    audioRecorder: {
      micIcon: {
        pathFill: COLORS.primary,
      },
      checkContainer: {
        backgroundColor: COLORS.primary,
      },
      deleteContainer: {
        backgroundColor: COLORS.danger,
      },
      deleteIcon: {
        pathFill: "#FFFFFF",
      },
      slideToCancelContainer: {
        backgroundColor: "transparent",
      },
    },
    audioRecordingInProgress: {
      container: {
        backgroundColor: "transparent",
      },
      durationText: {
        color: COLORS.text,
      },
    },
    audioRecordingLockIndicator: {
      container: {
        backgroundColor: "transparent",
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
        backgroundColor: "transparent",
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
        backgroundColor: "transparent",
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
        borderRadius: 8,
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