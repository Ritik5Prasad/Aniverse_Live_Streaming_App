import { Href, router } from "expo-router";
import * as Haptics from 'expo-haptics';

export const resetAndNavigate = (newPath: Href<string | object>) => {
    if (router.canGoBack()) {
        router.dismissAll();
    }
    router.replace(newPath);
}

export const triggerHaptics = async (type: 'SOFT' | "FAST") => {
    if (type == 'FAST') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
    }
}

export const formatCount = (count: number) => {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (count >= 1000) {
        return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return count?.toString();
};

export const timeAgo = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval === 1 ? "1 year ago" : `${interval} years ago`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval === 1 ? "1 month ago" : `${interval} months ago`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval === 1 ? "1 day ago" : `${interval} days ago`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
    }

    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
};
