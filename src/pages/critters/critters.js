import React from "react"
import { Component } from "react"
import critterStyles from "./critters.module.scss"
import Month from "./month"
import Time from "./time"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"

class Critters extends Component {
  state = {
    on: false,
    search: "",
    items: [],
    isSort: false,
  }

  onToggle = () => {
    this.setState({
      on: !this.state.on,
    })
  }

  onSort = event => {
    this.setState({ isSort: event.target.checked })
  }

  onSearch = event => {
    this.setState({ search: event.target.value })
  }

  getName = item => item.name["name-USen"]

  render() {
    let { critters, seller, sellerName } = this.props
    let collection = critters && [...critters]
    let search = this.state.search

    if (search.length > 0) {
      collection = collection.filter(
        item =>
          this.getName(item).toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    }

    let hemisphere = this.state.on
      ? "Southern Availability"
      : "Northern Availability"
    let hemisphereIndex = this.state.on ? "month-southern" : "month-northern"

    if (this.state.isSort && collection) {
      collection.sort((a, b) => (a.price < b.price ? 1 : -1))
    } else {
      collection = critters && [...critters]
    }

    return (
      <div className={critterStyles.critterBody}>
        <div className={critterStyles.critterNav}>
          <div className={critterStyles.searchContainer}>
            <input
              type="text"
              value={this.state.search}
              onChange={this.onSearch}
              className={critterStyles.searchBar}
              placeholder="Search"
              maxLength="25"
            />
            <div className={critterStyles.sortFont}>
              <input
                type="checkbox"
                onClick={this.onSort}
                className={critterStyles.sortPrice}
              />
              Sort by Price <br />
              (Highest to Lowest)
            </div>
          </div>

          <div className={critterStyles.hemisphereToggle}>
            <label className={critterStyles.switch}>
              <input type="checkbox" onChange={this.onToggle} />
              <span className={critterStyles.slider}></span>
            </label>
            <div className={critterStyles.hemisphereOption}>
              Northern <br />
              Southern
            </div>
          </div>
        </div>

        <div className={critterStyles.critterContainer}>
          {collection &&
            collection.map((item, index) => (
              <div key={index} className={critterStyles.critterCard}>
                <div className={critterStyles.critterProfile}>
                  <div className={critterStyles.critterName}>
                    <h4>
                      <span className={critterStyles.nameHighlight}>
                        {this.getName(item)}
                      </span>
                    </h4>
                  </div>
                  <img
                    className={critterStyles.critterImage}
                    src={item.icon_uri}
                    alt={this.getName(item)}
                  />
                </div>
                <div className={critterStyles.critterInfo}>
                  <b>Nook's Cranny: </b>
                  {item.price} Bells
                  <br />
                  <b> {sellerName}: </b>
                  {item[seller]} Bells
                  <br />
                  <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                  {item.availability["location"]}
                </div>
                <div className={critterStyles.critterInfo}>
                  <div>
                    <div className={critterStyles.availabilityCenter}>
                      {hemisphere}
                    </div>
                    <Month>{item.availability[hemisphereIndex]}</Month>
                    <Time>{item.availability["time"]}</Time>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default Critters
