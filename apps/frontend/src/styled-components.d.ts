import type ITheme from '@/utils/styled';

declare module 'styled-components' {
	export interface DefaultTheme extends ITheme {}
}
