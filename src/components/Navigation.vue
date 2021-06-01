<template>
	<div class="navigation">
		<img
			class="mr-logo"
			:src="MRLogoImg" />
		<div :class="['navigation-container', { 'mobile-open': mobileOpen }]">
			<div
				class="toggle"
				@click="toggleMobile">
				<div class="line" />
				<div class="line" />
				<div class="line" />
			</div>
			<nav class="primary-nav">
				<ul>
					<li class="nav-item"><a href="/robots">Robots</a></li>
					<li class="nav-item"><a href="/results">Results</a></li>
				</ul>
			</nav>
			<nav class="secondary-nav">
				<ul>
					<li
						v-if="user && user.admin"
						class="nav-item secondary"><a href="/admin">Admin</a></li>
					<li
						v-if="user"
						class="nav-item secondary"><button @click="logout">Log Out</button></li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script>
import MRLogoImg from '@/assets/mr-logo.svg';
import RobotAPIService from '@/services/robot-api';
import { mapState } from 'vuex';

export default {
	name: 'navigation',
	data() {
		return {
			mobileOpen: false,
			MRLogoImg
		}
	},
	computed: {
		...mapState({
			user: state => state.user
		})
	},
	methods: {
		toggleMobile() {
			this.mobileOpen = !this.mobileOpen;
		},
		async logout() {
			this.$store.commit('SET_LOADING', { loading: true });
			try {
				await RobotAPIService.logout(this.user.authToken);
				this.$store.commit('SET_MESSAGE', { message: `Bye, ${this.user.fullName}!` });
				this.$store.commit('SET_USER', { user: null });
				this.$router.push({ name: 'login' });
			} catch (error) {
				this.$store.commit('SET_MESSAGE', { message: 'Failed to Logout', type: 'error' });
			}
			this.$store.commit('SET_LOADING', { loading: false });
		}
	}
}
</script>

<style lang="scss" scoped>
.navigation {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	background: #FFFFFF;
	box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.17);
	padding: 24px 100px;
	display: flex;
	align-items: center;
	z-index: 10;
	box-sizing: border-box;

	.mr-logo {
		width: 81px;
		height: 32px;
		margin-right: 56px;
	}

	.navigation-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		.toggle {
			display: none;
			flex-direction: column;

			.line {
				width: 33px;
				height: 2px;
				background: $gray3;
				transition-duration: .28s;
				transition-property: transform,margin,opacity;
				transition-timing-function: cubic-bezier(.4,0,.2,1);
				
				&:not(:last-of-type) {
					margin-bottom: 6px;
				}
			}

			&:hover {
				cursor: pointer;
			}
		}

		nav {
			ul {
				list-style: none;
				display: flex;
				align-items: center;
				padding: 0;
				margin: 0;

				.nav-item {
					margin-right: 40px;

					a {
						font-family: $font-family;
						font-style: normal;
						font-weight: bold;
						font-size: 18px;
						line-height: 21px;
						color: $gray3;
						text-decoration: none;
					}

					button {
						font-family: $font-family;
						font-style: normal;
						font-weight: bold;
						font-size: 18px;
						line-height: 21px;
						color: $gray3;
						text-decoration: none;
						outline: none;
						border: none;
						background: none;

						&:hover {
							cursor: pointer;
						}
					}

					&.secondary {
						margin-right: 24px;

						a, button {
							font-weight: normal;
							font-size: 16px;
							line-height: 18px;
							color: $gray2;
						}
					}

					&:last-of-type {
						margin-right: 0;
					}
				}
			}
		}
	}
}

@media (max-width: 900px) {
	.navigation {
		padding: 27px 24px;

		.mr-logo {
			width: 67px;
			height: 26px;
			margin-right: 0;
		}

		.navigation-container {
			flex-direction: column;
			align-items: center;

			.toggle {
				display: flex;
				align-self: flex-end;
			}

			nav {
				display: none;
			}

			&.mobile-open {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				padding: 27px 24px;
				box-sizing: border-box;
				background: $gray3;
				justify-content: flex-start;

				.toggle {
					.line {
						background: $white;
						transition-duration: .28s;
						transition-property: transform,margin,opacity;
						transition-timing-function: cubic-bezier(.4,0,.2,1);

						&:first-of-type {
							transform: rotate(45deg);
							margin-top: 11px;
						}

						&:last-of-type {
							transform: rotate(-45deg);
							margin-top: -16px;
						}

						&:not(:first-of-type):not(:last-of-type) {
							opacity: 0;
						}
					}
				}

				nav {
					display: block;

					ul {
						display: flex;
						flex-direction: column;

						.nav-item {
							margin: 23px 0;

							a, button {
								font-size: 40px;
								line-height: 46px;
								color: $gray1;
							}

							&.secondary {
								a, button {
									font-size: 40px;
									font-weight: bold;
									line-height: 46px;
									color: $gray1;
								}
							}
						}
					}

					&:first-of-type {
						margin-top: 71px;
					}
				}
			}
		}
	}
}
</style>
