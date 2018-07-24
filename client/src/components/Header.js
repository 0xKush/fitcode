import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Menu, Container, Icon } from "semantic-ui-react";

class Header extends Component {
  state = { activeItem: "signin" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { authenticated } = this.props;
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as={Link} to={!authenticated ? "/" : "/home"} header>
              <h3>
                <Icon
                  color="green"
                  name="code"
                  style={{ marginRight: "1.3em" }}
                />Fitcode
              </h3>
            </Menu.Item>

            {authenticated && (
              <Menu.Item
                as={Link}
                to="/auth/signout"
                name="signout"
                active={activeItem === "signout"}
                onClick={this.handleItemClick}
              >
                Sign Out
              </Menu.Item>
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
