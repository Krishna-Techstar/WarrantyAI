// =============================================================================
// MIT License
// Copyright (c) 2026 Aparavi Software AG
// =============================================================================

/// <reference types="@rsbuild/core/types" />

declare module 'shell' {
	import React from 'react';

	export interface ShellAppProps {
		isConnected?: boolean;
		identity?: {
			displayName?: string;
			email?: string;
		};
	}

	export interface AppDescriptor {
		id: string;
		name: string;
		branding?: {
			appName?: string;
			[key: string]: any;
		};
		app: React.FC<ShellAppProps>;
	}

	export const AppLayout: React.FC<{ sidebar?: React.ReactNode; showStatus?: boolean; children?: React.ReactNode }>;
	export const DocSplitLayout: React.FC<any>;
	export const DocTabs: React.FC<any>;
	export class Documents {
		openStaticDocument(id: string, name: string): void;
	}
}

declare module './components/*';
