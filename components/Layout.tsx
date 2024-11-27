"use client";
import { AppShell, Burger, Container, Flex, List } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import ColorThemeSwitch from "./ColorThemeSwitch";
import LogoSvg from "./LogoSvg";

export default function Layout({ children }: { children: React.ReactNode }) {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{
				height: {
					base: 100,
				},
			}}
			navbar={{
				width: {
					base: 100,
					sm: 150,
					lg: 200,
				},
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			padding="xl">
			<AppShell.Header p="xl" withBorder={false}>
				<Flex align="center" justify="space-between">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
					<LogoSvg height={40} width={40} />
					<ColorThemeSwitch />
				</Flex>
			</AppShell.Header>

			<AppShell.Navbar p="xl" withBorder={false}>
				<List listStyleType="none" type="unordered" spacing="lg">
					<List.Item>item 1</List.Item>
					<List.Item>item 2</List.Item>
					<List.Item>item 3</List.Item>
					<List.Item>item 4</List.Item>
				</List>
			</AppShell.Navbar>

			<AppShell.Main>
				<Container p="0">{children}</Container>
			</AppShell.Main>
		</AppShell>
	);
}
