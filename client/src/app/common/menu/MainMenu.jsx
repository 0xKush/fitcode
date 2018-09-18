import React, { Component } from 'react';
import { Menu, Container, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MainMenu extends Component {
  state = { activeItem: 'signin', activeItemSecondary: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { authenticated } = this.props;
    const { activeItem, handleItemClick } = this.state;
    return (
      <Menu as={Menu} fixed="top" size="massive" inverted>
        <Container>
          <Menu.Item as={Link} to={!authenticated ? '/' : '/food/diary'} header>
            <h2>
              <Icon color="green" name="code" style={{ marginRight: '1.5em' }} />
              Fitcode
            </h2>
          </Menu.Item>
          {authenticated && (
            <Menu.Menu position="right">
              <Menu.Item>
                <Label size="large" circular color="black">
                  User Info
              </Label>
              </Menu.Item>
              {/* <Menu.Item>User Info</Menu.Item> */}
              <Menu.Item
                position="right"
                as={Link}
                to="/"
                name="signout"
                active={activeItem === 'signout'}
                onClick={handleItemClick}
              >
                <h2>
                  <Icon color="green" name="power off" />
                </h2>
              </Menu.Item>

            </Menu.Menu>
          )}
        </Container>
      </Menu>
    );
  }
}

export default MainMenu;
