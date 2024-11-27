"use client";
import { AppShell, Burger, Flex, List } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import ColorThemeSwitch from "./ColorThemeSwitch";

export default function Layout({ children }: { children: React.ReactNode }) {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: {
					base: 100,
					sm: 150,
					lg: 200,
				},
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			padding="lg">
			<AppShell.Header p="lg">
				<Flex justify="space-between">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
					<div>Logo</div>
				</Flex>
			</AppShell.Header>

			<AppShell.Navbar p="lg">
				<List listStyleType="none" type="unordered" spacing="lg">
					<List.Item>item 1</List.Item>
					<List.Item>item 2</List.Item>
					<List.Item>item 3</List.Item>
					<List.Item>item 4</List.Item>
					<List.Item>
						<ColorThemeSwitch />
					</List.Item>
				</List>
			</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
}
